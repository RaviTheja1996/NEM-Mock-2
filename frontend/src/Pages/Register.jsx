import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    let res = axios.post(`https://grumpy-clam-beret.cyclic.app/api/register`, {
      email,
      password,
      username,
      avatar,
    });
    res
      .then((res) => {
        console.log("inside dot then");
        console.log(res.data);
      })
      .catch((err) => {
        console.log("in catch block");
        console.log(err.message);
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
        <label>
          username :
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </label>
        <label>
          avatar :
          <Input
            type="text"
            placeholder="Enter avatar url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          ></Input>
        </label>
        <Button onClick={handleRegister} type="submit">
          Register
        </Button>
      </Flex>
    </form>
  );
};

export default Register;
