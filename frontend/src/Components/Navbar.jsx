import { Flex, Link as ChakraLink, Button, Image } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const avatar = useSelector((store) => store.user.avatar);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      gap={"1rem"}
      bgColor={"grey"}
      color={"lightgreen"}
      height={"3rem"}
    >
      <ChakraLink as={ReactRouterLink} to="/">
        Home
      </ChakraLink>
      {isAuth ? (
        <Flex gap="1rem">
          <Image src={avatar} w="3.2rem" h="3.2rem" />
          <Button onClick={handleLogout}>Logout</Button>
        </Flex>
      ) : (
        <ChakraLink as={ReactRouterLink} to="/login">
          Login
        </ChakraLink>
      )}
      <ChakraLink as={ReactRouterLink} to="/blogs">
        Blogs
      </ChakraLink>
    </Flex>
  );
};

export default Navbar;
