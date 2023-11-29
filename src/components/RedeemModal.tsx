import React, { useState } from "react";
import {
  Text,
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

type Props = {};

const RedeemModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const isAmountValid = amount.trim() !== ""; // Check if amount is not empty or only whitespace

  const handleSend = () => {
    // Add your logic to handle the "Send" button click
    console.log("Sending:", { amount });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bgColor={"transparent"}>
        Redeem
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={2}>
              <Input readOnly value={"1Gx9FCknxSsLfFDzFdn75Xgqx95sDp38ir"} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={32}>Amount</InputLeftAddon>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isInvalid={!isAmountValid}
              />
            </InputGroup>
            {!isAmountValid && (
              <Text color='tomato' fontSize={"smaller"} px={2}>
                Please enter a valid amount
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSend} isDisabled={!isAmountValid}>
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

export default RedeemModal;
