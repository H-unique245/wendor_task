import { Button,
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
    useToast,
 } from '@chakra-ui/react'
import axios from 'axios';
import React, {useContext, useRef, useState } from 'react'
import { AppContext } from '../Context/AppContext';
// let token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRhY2I4OTlmM2Y4Y2Q0ZTkzNTQyMiIsIm5hbWUiOiJCYXRtYW4iLCJlbWFpbCI6ImJhdG1hbkBnYW1pbC5jb20iLCJpYXQiOjE2Nzc1Njk5MjMsImV4cCI6MTY3ODE3NDcyM30.ESJf6zeGQPkN_Xm_S2XTv12EIZKcPVhm5ZFg_K8V4XU";

function AddProduct({ isAddModalVisible, setIsAddModalVisible }) {
    const { token } = useContext(AppContext);
    const [product, setProduct] = useState({
        image_url:"",
        title:"",
        description:"",
        price:""

    });
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toast = useToast();
    
 
  const onClose = () => {
    setIsAddModalVisible(false);
  }; 

  const handleformData = (e) => {
    const {name,value} = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleProductAdd=async()=>{
    console.log("token :",token)
    try{
        let res = await axios.post(`http://localhost:8080/product/add`,product,{
            headers:{
                Authorization:token
            }
        })
        onClose();
        toast({
          title: res.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
    }
    catch(err){
        onClose();
        toast({
          title: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
    }
  }


  return (
    <div>
          <Modal
          isOpen={isAddModalVisible}
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
                  type="url"
                  value={product.image_url}
                  name="image_url"
                  placeholder='Enter image url'
                  onChange={handleformData}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Product Name"
                  value={product.title}
                  name="title"
                  onChange={handleformData}
                  />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type={'text'}
                  value={product.description}
                  name="description"
                  placeholder="description"
                  onChange={handleformData}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price (In ₹ )</FormLabel>
                <Input
                  type={'number'}
                  placeholder="e.g 3200"
                  value={product.price}
                  name="price"
                  onChange={handleformData}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleProductAdd}>
               Add Product
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  )
}

export default AddProduct;
