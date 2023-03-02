import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";

function ProductCard({ data }) {
  const { title, description, price, image_url, user_id } = data;
  return (
    <Card maxW="sm" boxShadow={"md"}>
      <CardBody
        bgGradient={[
          "linear(to-tr, teal.300, yellow.400)",
          "linear(to-t, blue.200, teal.500)",
          "linear(to-b, orange.100, purple.300)",
        ]}
      >
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
      <CardFooter bgGradient="linear(to-r, teal.100, gray.500)">
        <Stack>
          <Box>
            <Text as="b">Product added By</Text>
            <Text border={"1px solid"} borderRadius="2px" align={"center"}>
              {user_id.name}
            </Text>
          </Box>
          <Box>
            <Text as="b">User Email :</Text>
            <Text border={"1px solid"} borderRadius="2px" align={"center"}>
              {user_id.email}
            </Text>
          </Box>
        </Stack>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
