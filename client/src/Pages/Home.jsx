import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
} from "@chakra-ui/react";
import axios from "axios";
import AddProduct from "../Components/AddProductForm";
import ProductUpdate from "../Components/ProductUpdate";
import ProductCard from "../Components/ProductCard";

function Home() {
  const token = localStorage.getItem("userToken");
  const [products, setProducts] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isModalupdateVisible, setIsModalupdateVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  async function getData() {
    let res = await axios.get("https://wendor-inventory-api.onrender.com/product/usersProduct", {
      headers: { authorization: token },
    });
    setProducts(res.data.data);
  }
  const handleUpdateModal = (data) => {
    setIsModalupdateVisible(true);
    setDataUpdate(data);
  };
  const getAllProducts = async () => {
    let res = await axios.get(`https://wendor-inventory-api.onrender.com/product`);
    setAllProducts(res.data.data);
    onOpen();
  };
  const handleDelete = async (id) => {
    let res = await axios.delete(`https://wendor-inventory-api.onrender.com/product/${id}`);
    toast({
      title: res.data.message,
      status: "warning",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };
  useEffect(() => {
    getData();
  }, [products]);

  return (
    <div>
      <Heading>Product data</Heading>
      <Button colorScheme={"telegram"} m="2rem" onClick={getAllProducts}>
        All Products
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size="xl" m={"2rem"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>All Products in Inventory</DrawerHeader>
          <DrawerBody bgGradient="linear(to-r, gray.300, yellow.400, pink.200)">
            <SimpleGrid columns={[1, 2, 3]} gap={5} p={10}>
              {AllProducts.map(
                ({ _id, title, description, price, image_url, user_id }) => (
                  <ProductCard
                    key={_id}
                    data={{
                      _id,
                      title,
                      description,
                      price,
                      image_url,
                      user_id,
                    }}
                  />
                )
              )}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {!token ? (
        <Box
          h={"20rem"}
          fontSize={{ base: "16px", sm: "25px", md: "36px", lg: "45px" }}
        >
          You need to login to see products added by you
        </Box>
      ) : (
        <>
          <Box>
            <Button
              fontSize={{ base: "8px", sm: "10px", md: "15px" }}
              bgColor="green.400"
              color="white"
              onClick={() => setIsModalVisible(true)}
            >
              Add Product
            </Button>
            {isModalVisible && (
              <AddProduct
                isAddModalVisible={isModalVisible}
                setIsAddModalVisible={setIsModalVisible}
              />
            )}
          </Box>
          <SimpleGrid columns={[2, 3, 4]} gap={5} p={10}>
            {products.map(({ _id, title, description, price, image_url }) => (
              <Card maxW="sm" key={_id} boxShadow={"md"}>
                <CardBody>
                  <Image src={image_url} alt={title} borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{title}</Heading>
                    <Text>{description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      $ {price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    margin="auto"
                    spacing={10}
                  >
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      onClick={() =>
                        handleUpdateModal({
                          _id,
                          title,
                          description,
                          price,
                          image_url,
                        })
                      }
                    >
                      Update
                    </Button>
                    {isModalupdateVisible && (
                      <ProductUpdate
                        isUpdateModalVisible={isModalupdateVisible}
                        setIsUpdateModalVisible={setIsModalupdateVisible}
                        data={dataUpdate}
                      />
                    )}
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}
    </div>
  );
}

export default Home;
