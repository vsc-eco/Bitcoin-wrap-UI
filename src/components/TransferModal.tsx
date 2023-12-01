import {
  Button,
  Text,
  Input,
  Flex,
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
  const isAmountValid = amount.trim() !== "" && /^\d*\.?\d*$/.test(amount); // Check if amount is not empty or only whitespace

  const handleSend = () => {
    // Add your logic to handle the "Send" button click
    console.log("Sending:", { destination, amount });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bgColor={"transparent"} fontSize="xs">
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
            <Text color="tomato" fontSize="xs" px={2}>
              Account not found!
            </Text>
            <InputGroup py={4}>
              <InputLeftAddon w={32}>Amount</InputLeftAddon>
              <Input
                isRequired
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isInvalid={!isAmountValid}
              />
            </InputGroup>
            {!isAmountValid && (
              <Text color="tomato" fontSize={"smaller"} px={2}>
                Please enter a valid amount
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={isDisabled}
              onClick={handleSend}
            >
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
