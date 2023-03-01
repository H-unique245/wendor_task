import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let initUser = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
export default function SignupForm() {
  const [user, setUser] = useState(initUser);
  const toast = useToast();
  const navigate = useNavigate();

  const hanndleUser = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleUserSignup = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      let res = await axios.post("http://localhost:8080/user/signup", user);
      toast({
        title: res.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("red.100", "red.600")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign Up with Details</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"xl"}
          border="1px solid"
          p={8}
        >
          <Stack spacing={2}>
            <form onSubmit={handleUserSignup}>
              <FormControl id="name" isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input
                  type="text"
                  value={user.name}
                  name="name"
                  placeholder="e.g John Doe"
                  onChange={hanndleUser}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={user.email}
                  name="email"
                  placeholder="e.g sample@gmail.com"
                  onChange={hanndleUser}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Enter phone Number</FormLabel>
                <Input
                  type="number"
                  value={user.phone}
                  name="phone"
                  placeholder="e.g 9876543210"
                  onChange={hanndleUser}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={user.password}
                  name="password"
                  placeholder="Enter Password"
                  onChange={hanndleUser}
                />
              </FormControl>

              <Input
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                mt={5}
                type="submit"
                value="Register"
              />
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
