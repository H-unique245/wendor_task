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
} from "@chakra-ui/react";
import axios from "axios";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRhY2I4OTlmM2Y4Y2Q0ZTkzNTQyMiIsIm5hbWUiOiJCYXRtYW4iLCJlbWFpbCI6ImJhdG1hbkBnYW1pbC5jb20iLCJpYXQiOjE2Nzc1Njk5MjMsImV4cCI6MTY3ODE3NDcyM30.ESJf6zeGQPkN_Xm_S2XTv12EIZKcPVhm5ZFg_K8V4XU";
function Home() {
  const [products, setProducts] = useState([]);
  async function getData() {
    let res = await axios.get("http://localhost:8080/product/usersProduct", {
      headers: {
        authorization: token,
      },
    });
    //  console.log(res.data);
    setProducts(res.data.data);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Heading>Product data</Heading>
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
                <Button variant="solid" colorScheme="teal">
                  Update
                </Button>
                <Button variant="outline" colorScheme="red">
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default Home;
