/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Flex,
  Input,
  Link as ChakraLink,
  Text,
  HStack,
  useToast
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: res.data.user, token: res.data.token },
        });
        toast({
          title: 'Login success',
          position: "top",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        navigate("/blogs");
      });
  };

  //   useEffect(() => {
  //     axios
  //       .get("https://grumpy-clam-beret.cyclic.app/api/")
  //       .then((res) => setUsers(res.data));
  //   }, []);

  return (
    <form style={{ width: "50%", margin: "auto", marginTop: "2rem", backgroundColor: "#DCDBD8", paddingTop: "1rem", paddingBottom: "1rem" }}>
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap="1rem"
      >
        <HStack spacing={6} w="70%">
          <Text>
            Email
          </Text>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bgColor={"white"}
          ></Input>
        </HStack>
        <HStack spacing={6} w="70%">
          <Text>
            Password
          </Text>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bgColor={"white"}
          ></Input>
        </HStack>
        <Button onClick={handleLogin} type="submit" mt="1rem" bgColor={"lightgreen"} _hover={{ bgColor: "lightgreen" }}>
          Login
        </Button>
        <Text fontSize={"md"}>Not Registered ?{" "}
          <ChakraLink as={ReactRouterLink} to="/register" color={"blue"}>
            Register
          </ChakraLink>
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
