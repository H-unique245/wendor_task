import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Navbar() {
  const { isAuth, logoutUser } = useContext(AppContext);
  return (
    <HStack
      justifyContent={"space-between"}
      bgGradient={[
        "linear(to-tr, teal.300, yellow.400)",
        "linear(to-t, blue.200, teal.500)",
        "linear(to-b, orange.100, purple.300)",
      ]}
      boxShadow="lg"
      p={3}
    >
      <Box
        border={"1px solid blue"}
        borderRadius="8px"
        bg="gray.500"
        p={2}
        color={"white"}
      >
        <Link to="/">Home</Link>
      </Box>
      {isAuth === true ? (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"blue"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            onClick={logoutUser}
          >
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link to="/login">
            <Button fontSize={"sm"} fontWeight={400}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      )}
    </HStack>
  );
}

export default Navbar;
