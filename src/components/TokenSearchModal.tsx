//TODO: to conditionally add the component and render the 
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

function SearchModal({ isOpen, onClose }) {
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

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <ChakraProvider>
      <Box p={6}>
        <Button onClick={onOpen}>Open Search Modal</Button>
        <SearchModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
