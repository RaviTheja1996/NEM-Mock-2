import { Flex, Link as ChakraLink, Button, Image, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const avatar = useSelector((store) => store.logged_user.avatar);
  const username = useSelector((store) => store.logged_user.username);
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
      color={"#95F098"}
      height={"3rem"}
    >
      <ChakraLink as={ReactRouterLink} to="/">
        Home
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to="/blogs">
        Blogs
      </ChakraLink>
      {isAuth ? (
        <Flex gap="1rem">
          <Image src={avatar} w="3rem" h="2.7rem" />
          <Flex flexDirection={"column"} justifyContent={"center"}><Text>{username.toUpperCase()}</Text></Flex>
          <Button onClick={handleLogout}>Logout</Button>
        </Flex>
      ) : (
        <ChakraLink as={ReactRouterLink} to="/login">
          Login
        </ChakraLink>
      )}
    </Flex>
  );
};

export default Navbar;
