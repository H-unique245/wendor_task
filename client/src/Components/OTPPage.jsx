import { Center, Heading, useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [data, setData] = useState();
  const [phoneNum, setPhoneNum] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  const handleVerifyOtp = () => {
    console.log(data);
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(data)
      .then((result) => {
        // User signed in successfully.
        console.log(result.UserCredentialImpl);
        const user = result.user;
        toast({
          title: "Login Success!! Welcome!!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        toast({
          title: "User couldn't sign in (bad verification code?)",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
      });
  };
  useEffect(() => {
    let numberSave = localStorage.getItem("phoneOTP");
    setPhoneNum(numberSave);
  }, []);
  return (
    <Flex
      align={"center"}
      m={3}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter OTP
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent code to your mobile
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {phoneNum}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput onChange={(e) => setData(e)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleVerifyOtp}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
