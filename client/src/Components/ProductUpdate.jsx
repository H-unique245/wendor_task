import { Modal,Button,
    CardFooter,
    Divider,
    Image,
    SimpleGrid,
    FormControl,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    FormLabel,
    Box,
    ModalOverlay,
 } from '@chakra-ui/react'
import React from 'react'

function ProductUpdate() {
  return (
    <div>
        
    </div>
    // <Modal
    //       initialFocusRef={initialRef}
    //       finalFocusRef={finalRef}
    //       isOpen={isOpen}
    //       onClose={onClose}
    //     >
    //       <ModalOverlay />
    //       <ModalContent>
    //         <ModalHeader>Add A Product</ModalHeader>
    //         <ModalCloseButton />
    //         <ModalBody pb={6}>
    //           <FormControl>
    //             <FormLabel> Image URL</FormLabel>
    //             <Input
    //               onChange={handleformData}
    //               ref={initialRef}
    //               type="url"
    //               name="image"
    //               value={product.image}
    //             />
    //           </FormControl>
    //           <FormControl>
    //             <FormLabel> name</FormLabel>
    //             <Input
    //               onChange={handleformData}
    //               ref={initialRef}
    //               placeholder="Product Name"
    //               name="title"
    //               value={product.title}
    //             />
    //           </FormControl>

    //           <FormControl mt={4}>
    //             <FormLabel>Category</FormLabel>
    //             <Input
    //               onChange={handleformData}
    //               name="category"
    //               placeholder="like: Mackup,hair.."
    //               value={product.category}
    //             />
    //           </FormControl>

    //           <FormControl mt={4}>
    //             <FormLabel>Brand</FormLabel>
    //             <Input
    //               onChange={handleformData}
    //               placeholder="Brand Name"
    //               name="brand"
    //               value={product.brand}
    //             />
    //           </FormControl>

    //           <FormControl mt={4}>
    //             <FormLabel>Price</FormLabel>
    //             <Input
    //               onChange={handleformData}
    //               placeholder="In ₹ "
    //               value={product.offer_price}
    //               name="offer_price"
    //             />
    //           </FormControl>
    //         </ModalBody>

    //         <ModalFooter>
    //           <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
    //             Save
    //           </Button>
    //           <Button onClick={onClose}>Cancel</Button>
    //         </ModalFooter>
    //       </ModalContent>
    //     </Modal>
  )
}

export default ProductUpdate
