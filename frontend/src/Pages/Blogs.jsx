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
  Image,
  useToast
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
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  const username = useSelector((store) => store.logged_user.username);
  const avatar = useSelector((store) => store.logged_user.avatar);
  const token = useSelector((store) => store.token);
  const blogs = useSelector((store) => store.blogs);
  const toast = useToast();

  // const setFilterCategoryCall = (value, callback) => {
  //   setFilterCategory(prevCategory => value);
  //   if (callback) callback();
  // };

  // const setSortOrderCall = (value, callback) => {
  //   setSortOrder(prevOrder => value);
  //   if (callback) callback();
  // };

  const config = useMemo(() => {
    return {
      headers: {
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`,
      },
    };
  }, [token]);

  let blogFetchUrl = `${process.env.REACT_APP_API_URL}/api/blogs/`;

  const handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
      avatar, title, content, category, date: new Date().toISOString(), likes: 0, comments: []
    };
    axios.post(`${process.env.REACT_APP_API_URL}/api/blogs/`, postData, config)
      .then((res) => {
        console.log(res.data);
        toast({
          title: `${res.data.msg}`,
          status: 'success',
          duration: 2000,
          position: "top",
          isClosable: true,
        })
        blogsFetch();
      })
      .catch((err) => {
        console.log(`error in handleSubmit catch block`);
        console.log(err);
      });
  }

  const handleSearch = () => {
    axios.get(`${blogFetchUrl}?title=${searchKey}`, config)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "BLOGS_DATA_FETCH", payload: res.data });
      })
      .catch((err) => {
        console.log(`error in handleSearch catch block`);
        console.log(err);
      })
  }

  const blogsFetch = () => {
    if (filterCategory) {
      blogFetchUrl = `${process.env.REACT_APP_API_URL}/api/blogs/`;
      blogFetchUrl += `?category=${filterCategory}`;
    }
    if (sortOrder) {
      blogFetchUrl = `${process.env.REACT_APP_API_URL}/api/blogs/`;
      blogFetchUrl += `?sort=date&order=${sortOrder}`;
    }
    if (filterCategory && sortOrder) {
      blogFetchUrl = `${process.env.REACT_APP_API_URL}/api/blogs/`;
      blogFetchUrl += `?category=${filterCategory}&sort=date&order=${sortOrder}`;
    }
    console.log(blogFetchUrl);
    axios.get(blogFetchUrl, config).then((res) => {
      console.log(res.data);
      dispatch({ type: "BLOGS_DATA_FETCH", payload: res.data });
    }).catch((err) => {
      console.log(`error in fetchBlogs catch block`);
      console.log(err);
    })
  };

  useEffect(() => {
    blogsFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory, sortOrder]);

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
        <Select placeholder='Filter by category' value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); }}>
          <option value='Business'>Business</option>
          <option value='Tech'>Tech</option>
          <option value='Lifestyle'>Lifestyle</option>
          <option value='Entertainment'>Entertainment</option>
        </Select>
        <Select placeholder='sort by date' value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); }}>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </Select>
        <Button onClick={() => {
          setFilterCategory("");
          setSortOrder("");
          blogsFetch();
        }}>Reset</Button>
      </Flex>
      <Flex flexDirection="column" gap="1rem" mt="2rem" w="60%" mx="auto">
        {blogs?.map((el, ind) => {
          return <Box key={ind} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
            <VStack spacing={4}>
              <HStack spacing={6}>
                <Image src={el.avatar} w="3rem" h="3rem" />
                <Text fontSize={"xl"}>{el.username}</Text>
              </HStack>
              <Text fontSize={"lg"}>{`content: ${el.content}`}</Text>
            </VStack>
          </Box>
        })}
      </Flex>
    </>
  );
};

export default Blogs;
