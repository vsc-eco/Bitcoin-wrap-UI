import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const TransferModal = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button onClick={onOpen} bgColor={"transparent"}>Transfer</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transfer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup my={2}>
                <InputLeftAddon w={32} >
                  Destination
                </InputLeftAddon >
                <Input  />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon w={32}>
                 Amount
                </InputLeftAddon>
                <Input />
              </InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Send
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };


export default TransferModal;
