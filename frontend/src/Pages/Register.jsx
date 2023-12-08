import { Button, Flex, HStack, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let res = axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
      email,
      password,
      username,
      avatar,
    });
    res
      .then((res) => {
        console.log("inside dot then");
        console.log(res.data);
        toast({
          title: `${res.data.msg}`,
          status: 'success',
          duration: 2000,
          position: "top",
          isClosable: true,
        })
        dispatch({ type: "REGISTER", payload: res.data.new_user });
        navigate("/login");
      })
      .catch((err) => {
        console.log("in catch block");
        console.log(err.message);
      });
  };

  return (
    <form style={{ width: "60%", margin: "auto", marginTop: "2rem", backgroundColor: "#DCDBD8", paddingTop: "1rem", paddingBottom: "1rem" }}>
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap="1rem"
      >
        <HStack spacing={6}>
          <label>
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bgColor={"white"}
          ></Input>
        </HStack>
        <HStack spacing={6}>
          <label>
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bgColor={"white"}
          ></Input>
        </HStack>
        <HStack spacing={6}>
          <label>
            Username
          </label>
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bgColor={"white"}
          ></Input>
        </HStack>
        <HStack spacing={6}>
          <label>
            Avatar
          </label>
          <Input
            type="text"
            placeholder="Enter avatar url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            bgColor={"white"}
          ></Input>
        </HStack>
        <Button onClick={handleRegister} type="submit" mt="1rem" bgColor={"lightgreen"} _hover={{ bgColor: "lightgreen" }}>
          Register
        </Button>
      </Flex>
    </form>
  );
};

export default Register;
