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
import React, { useState } from "react";

type Props = {};

const TransferModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const isDisabled = !destination || !amount;

  const handleSend = () => {
    // Add your logic to handle the "Send" button click
    console.log("Sending:", { destination, amount });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bgColor={"transparent"} fontSize='xs'>
        Transfer
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={2}>
              <InputLeftAddon w={32}>Destination</InputLeftAddon>
              <Input
                isRequired
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={32}>Amount</InputLeftAddon>
              <Input
                isRequired
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} isDisabled={isDisabled} onClick={handleSend}>
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
