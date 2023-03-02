import {
  Button,
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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function ProductUpdate({
  isUpdateModalVisible,
  setIsUpdateModalVisible,
  data,
}) {
  const toast = useToast();

  const [product, setProduct] = useState(data);

  const onClose = () => {
    setIsUpdateModalVisible(false);
  };

  const handleformData = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = async (payload) => {
    let res = await axios.put(
      `https://wendor-inventory-api.onrender.com/product/edit/${payload._id}`,
      payload
    );
    onClose();
    toast({
      title: res.data.message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div>
      <Modal isOpen={isUpdateModalVisible} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel> Image URL</FormLabel>
              <Input
                type="url"
                value={product.image_url}
                name="image_url"
                onChange={handleformData}
              />
            </FormControl>
            <FormControl>
              <FormLabel> name</FormLabel>
              <Input
                placeholder="Product Name"
                value={product.title}
                name="title"
                type={"text"}
                onChange={handleformData}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={product.description}
                name="description"
                type={"text"}
                placeholder="description"
                onChange={handleformData}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="In ₹ "
                value={product.price}
                type="number"
                name="price"
                onChange={handleformData}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product)}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProductUpdate;
