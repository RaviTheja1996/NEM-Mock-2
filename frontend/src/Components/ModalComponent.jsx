import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    HStack,
    Text,
    Input,
    Textarea,
    Flex,
    Select
} from "@chakra-ui/react";
import { useSelector } from 'react-redux';

const ModalComponent = ({ isOpen, onClose, handleSubmit }) => {

    const username = useSelector((store) => store.logged_user.username);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <HStack spacing={6}>
                            <Text>Username</Text>
                            <Input type='text' bgColor={"white"} value={username} isDisabled={true}></Input>
                        </HStack>
                        <HStack spacing={6}>
                            <Text>Title</Text>
                            <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} bgColor={"white"} isDisabled={true}>{username}</Input>
                        </HStack>
                        <HStack spacing={6}>
                            <Text>Content</Text>
                            <Textarea type='text' size='sm' value={content} onChange={(e) => setContent(e.target.value)} bgColor={"white"} isDisabled={true}>{username}</Textarea>
                        </HStack>
                        <Select placeholder='Select category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value='Business'>Business</option>
                            <option value='Tech'>Tech</option>
                            <option value='Lifestyle'>Lifestyle</option>
                            <option value='Entertainment'>Entertainment</option>
                        </Select>
                        <Flex justifyContent={"center"}><Button colorScheme='green'>Post Blog</Button></Flex>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalComponent