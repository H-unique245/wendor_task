import {
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState(0);

  const hanldeSubmitPhone = (e) => {
    e.preventDefault();
    console.log("Number", phone);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Log In
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an OTP on your phone
        </Text>
        <form onSubmit={hanldeSubmitPhone}>
          <FormControl id="email" isRequired>
            <FormLabel>Enter Phone Number</FormLabel>
            <Input
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              type="number"
            />
          </FormControl>
          <Stack spacing={6}>
            <Input
              bg={"blue.400"}
              color={"white"}
              type={"submit"}
              value={"Request OTP"}
              _hover={{
                bg: "blue.500",
              }}
            />
          </Stack>
        </form>
        <Box textColor={"blue"} textDecoration={"underline"}>
          <Link to="/login">Login with password</Link>
        </Box>
      </Stack>
    </Flex>
  );
}
