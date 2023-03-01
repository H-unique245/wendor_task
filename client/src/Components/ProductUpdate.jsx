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
    useDisclosure,
    useToast,
 } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function ProductUpdate({ isUpdateModalVisible, setIsUpdateModalVisible,data }) {
    const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [product, setProduct] = useState(data);
 
  const onClose = () => {
    setIsUpdateModalVisible(false);
  }; 

  const handleformData = ({ target }) => {
    let val = target.value;
    if (target.name === "price") {
      val = +target.value;
    }
    setProduct({ ...product, [target.name]: val });
  };

  const handleUpdate=async(payload)=>{

    let res = await axios.put(`http://localhost:8080/product/edit/${payload._id}`,payload)
    onClose();
    toast({
      title: res.data.message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }

//   useEffect(()=>{
//     setProduct(data)
//   },[]);

  return (
    <div>
          <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isUpdateModalVisible}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
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
        </Modal>
    </div>
  
  )
}

export default ProductUpdate
