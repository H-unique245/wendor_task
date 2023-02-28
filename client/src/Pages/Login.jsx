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
import { authentication } from "../Components/firbase-config";
import {  RecaptchaVerifier,signInWithPhoneNumber  } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";

const GenerateRecaptcha=()=>{
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-verify', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    }
  }, authentication);
}

export default function LoginPage() {
  const [phone, setPhone] = useState('+91');

  const hanldeSubmitPhone = async(e) => {
    e.preventDefault();
    // phone check --- api request backend
    let mobile= +phone.slice(3,13);
    console.log(mobile)
   try{
    let res= await axios.post("http://localhost:8080/user/loginwithphone",{phone:mobile});
   
    // res --- true
    if(res.data.message ==="Login Success with Phone"){
  // firebase otp request
    GenerateRecaptcha();

    const appVerifier= window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phone, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      console.log(error);
      // ...
    });
    }
    // else --> not in DB
     else{
      alert("Signup with number")
     }
   }
   catch(err){
    alert("Signup with number")
   }
    

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
          <FormControl id="phone" isRequired>
            <FormLabel>Enter Phone Number</FormLabel>
            <Input
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              type="tel"
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
        <Box id="recaptcha-verify"> </Box>
        <Box textColor={"blue"} textDecoration={"underline"}>
          <Link to="/login">Login with password</Link>
        </Box>
      </Stack>
    </Flex>
  );
}
