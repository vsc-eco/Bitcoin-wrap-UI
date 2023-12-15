//TODO: to conditionally add the component and render the from the json data 
import React from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";


function TokenSearchModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input type="text" placeholder="Search..." />
            </InputGroup>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default TokenSearchModal;
