import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';

export default function PasswordLogin() {
  const [formData,setFormData]= useState({
    email:'',
    password:''
  })
  const { loginUser,token } = useContext(AppContext);


  const handleChange=(e)=>{
   const{name,value}= e.target;

   setFormData({...formData,[name]:value});
  }
 
  const handlePasswordLogin=async(e)=>{
    e.preventDefault();
    console.log("User :",formData);
    try {
      let res = await axios.post("http://localhost:8080/user/login", formData);
      console.log(res.data.token);
      loginUser(res.data.token);

    }
      catch(err){
        
      }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in Using password</Heading>
          <Box>token:{token}</Box>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handlePasswordLogin}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder='e.g sample@gmail.com' value={formData.email} name='email' onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder='Enter password'  value={formData.password} name='password' onChange={handleChange} />
            </FormControl>
                <Input
                bg={'blue.400'}
                mt={5}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type= 'submit'
                value={'Log In'}
                 />
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}