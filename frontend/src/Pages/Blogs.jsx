import {
  Flex,
  InputGroup,
  Input,
  Button,
  InputRightElement,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Text,
  Textarea,
  Select,
  Box,
  VStack,
  Image
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Blogs = () => {
  const [searchKey, setSearchKey] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const username = useSelector((store) => store.logged_user.username);
  const avatar = useSelector((store) => store.logged_user.avatar);
  const token = useSelector((store) => store.token);
  const blogs = useSelector((store) => store.blogs);

  const config = useMemo(() => {
    return {
      headers: {
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`,
      },
    };
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
      avatar, title, content, category, date: new Date().toISOString(), likes: 0, comments: []
    };
    axios.post(`${process.env.REACT_APP_API_URL}/api/blogs/`, postData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`error in handleSubmit catch block`);
        console.log(err);
      })
  }

  const handleSearch = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/blogs?title=${searchKey}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`error in handleSearch catch block`);
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/`, config).then((res) => {
      console.log(res.data);
      dispatch({ type: "BLOGS_DATA_FETCH", payload: res.data });
    }).catch((err) => {
      console.log(`error in useEffect fetchBlogs catch block`);
      console.log(err);
    })
  }, [dispatch, config]);

  return (
    <>
      <Flex justifyContent={"center"} mb={"2rem"} mt={"1rem"}>
        <Button bgColor={"green"} color={"white"} _hover={{ bgColor: "green" }} onClick={onOpen}>Create Blog</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex gap="1rem" flexDirection="column">
                <HStack spacing={6}>
                  <Text>Username</Text>
                  <Input type='text' bgColor={"white"} value={username} color="tomato" isDisabled={true} />
                </HStack>
                <HStack spacing={6}>
                  <Text>Title</Text>
                  <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} bgColor={"white"} ></Input>
                </HStack>
                <HStack spacing={6}>
                  <Text>Content</Text>
                  <Textarea type='text' size='sm' value={content} onChange={(e) => setContent(e.target.value)} bgColor={"white"} ></Textarea>
                </HStack>
                <Select placeholder='Select category' value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value='Business'>Business</option>
                  <option value='Tech'>Tech</option>
                  <option value='Lifestyle'>Lifestyle</option>
                  <option value='Entertainment'>Entertainment</option>
                </Select>
                <Flex justifyContent={"center"}><Button colorScheme='green' type="submit">Post Blog</Button></Flex>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent={"center"} gap={"1rem"}>
        <InputGroup size='md'>
          <Input
            type="text"
            placeholder='Search'
            colorScheme="blue"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <InputRightElement w="3rem">
            <Button onClick={handleSearch} bgColor={"lightblue"} _hover={{ bgColor: "lightblue" }}><Search2Icon /></Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex flexDirection="column" gap="1rem">
        {blogs?.map((el, ind) => {
          return <Box key={ind}>
            <VStack spacing={6}>
              <HStack spacing={6}>
                <Image src={el.avatar} w="3rem" h="3rem" />
              </HStack>
            </VStack>
          </Box>
        })}
      </Flex>
    </>
  );
};

export default Blogs;
