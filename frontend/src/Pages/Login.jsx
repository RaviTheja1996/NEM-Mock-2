/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Flex,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`https://grumpy-clam-beret.cyclic.app/api/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      });
  };

  return (
    <form style={{ width: "90%", margin: "auto", marginTop: "2rem" }}>
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap="1rem"
      >
        <label>
          Email :
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </label>
        <label>
          Password :
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </label>
        <Button onClick={handleLogin} type="submit">
          Login
        </Button>
        <Text fontSize={"md"}>Not Registered ?</Text>
        <br />
        <ChakraLink as={ReactRouterLink} to="/register" color={"blue"}>
          Register
        </ChakraLink>
      </Flex>
    </form>
  );
};

export default Login;
