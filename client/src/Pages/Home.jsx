import React, { useContext, useEffect, useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import AddProduct from "../Components/AddProductForm";
import { AppContext } from "../Context/AppContext";
import ProductUpdate from "../Components/ProductUpdate";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRhY2I4OTlmM2Y4Y2Q0ZTkzNTQyMiIsIm5hbWUiOiJCYXRtYW4iLCJlbWFpbCI6ImJhdG1hbkBnYW1pbC5jb20iLCJpYXQiOjE2Nzc1Njk5MjMsImV4cCI6MTY3ODE3NDcyM30.ESJf6zeGQPkN_Xm_S2XTv12EIZKcPVhm5ZFg_K8V4XU";

  function Home() {
  // const { token } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataUpdate,setDataUpdate]=useState({});
  const [isModalupdateVisible, setIsModalupdateVisible] = useState(false);
  const toast = useToast();

  // const handleformData = ({ target }) => {
  //   let val = target.value;
  //   if (target.name === "price") {
  //     val = +target.value;
  //   }
  //   setProduct({ ...product, [target.name]: val });
  // };
  async function getData() {
    let res = await axios.get("http://localhost:8080/product/usersProduct", {
      headers: {
        authorization: token,
      },
    });
    //  console.log(res.data);
    setProducts(res.data.data);
  }

  // const handleUpdate=async(payload)=>{

  //   let res = await axios.put(`http://localhost:8080/product/edit/${payload._id}`,payload)
  //   onClose();
  //   toast({
  //     title: res.data.message,
  //     status: "success",
  //     duration: 2000,
  //     isClosable: true,
  //     position: "top",
  //   });
  // }

  const handleUpdateModal=(data)=>{
  setIsModalupdateVisible(true); 
  setDataUpdate(data)  ;
  console.log("data",data)
  }

  const handleDelete=async(id)=>{
    let res = await axios.delete(`http://localhost:8080/product/${id}`)
     alert(res.data.message)
  }
  useEffect(() => {
    getData();
  }, [products]);
  return (
    <div>
      <Heading>Product data</Heading>
      <Box>
      <Button
            fontSize={{ base: "8px", sm: "10px", md: "15px" }}
            bgColor="green.400"
            color="white"
            onClick={() => setIsModalVisible(true)}
          >
            {" "}
            Add Product
          </Button>
          {isModalVisible && (
            <AddProduct
            isAddModalVisible={isModalVisible}
            setIsAddModalVisible={setIsModalVisible}
            />)
          }
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
                <Button variant="solid" colorScheme="teal" 
                onClick={()=>handleUpdateModal({ _id, title, description, price, image_url })}
                // onClick={() => {
                //         onOpen();
                //         setProduct({ _id, title, description, price, image_url });
                //       }}
                      >
                  Update
                </Button>
                {
                  isModalupdateVisible && (
                    <ProductUpdate
                     isUpdateModalVisible={isModalupdateVisible}
                     setIsUpdateModalVisible={setIsModalupdateVisible}
                     data= {dataUpdate}
                    />
                  )
                }
                <Button variant="outline" colorScheme="red" onClick={()=>handleDelete(_id)}>
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      {/* <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add A Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel> Image URL</FormLabel>
                <Input
                  onChange={handleformData}
                  ref={initialRef}
                  type="url"
                  name="image_url"
                  value={product.image_url}
                />
              </FormControl>
              <FormControl>
                <FormLabel> name</FormLabel>
                <Input
                  onChange={handleformData}
                  ref={initialRef}
                  placeholder="Product Name"
                  name="title"
                  value={product.title}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  onChange={handleformData}
                  name="description"
                  placeholder="description"
                  value={product.description}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  onChange={handleformData}
                  placeholder="In ₹ "
                  type={'number'}
                  value={product.price}
                  name="price"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={()=>handleUpdate(product)}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
    </div>
  );
}

export default Home;

