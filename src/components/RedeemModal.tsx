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
import { useAccountContext } from "../context/AccountContext";
import { getOutputs, useCreateTx } from "../hooks/VSC";
import { DHive } from "../const";
import { useQuery } from "@tanstack/react-query";



type Props = {};

const RedeemModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const isAmountValid = (amount.trim() !== "") && ( /^\d*\.?\d*$/.test(amount)); // Check if amount is not empty or only whitespace

  const { triggerLoginWithHive, myDid, myAuth } = useAccountContext();
  const { redeem } = useCreateTx()

  const handleSend = async () => {
    // Add your logic to handle the "Send" button click

    console.log({
      amount,
      didAuth: myAuth,
      did: myDid,
      dest: queryAccount.data,
    })
    await redeem({
      amount: Number(amount),
      didAuth: myAuth,
      did: myDid,
      dest: queryAccount.data,
      destHive: destination
    })
    onClose();
  };

  const allowedAmount = useQuery({
    queryKey: ["transfer_balance", myDid],
    queryFn: async () => {
      const outputs = await getOutputs(myDid)
      const amount = outputs.map(e => e.balance).reduce((a, b) => {
        return a + b;
      })
      console.log('transferred allowed amount', amount)
      return amount;
    },
  }) 

  return (
    <>
      <Button onClick={onOpen} bgColor={"transparent"} fontSize='xs'>
        Redeem
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={2}>
            <InputLeftAddon w={32}>BTC Address</InputLeftAddon>
              <Input />
            </InputGroup>
            {/* <Text color="tomato" fontSize="xs" px={2}>
              Account not found!
            </Text> */}
            <InputGroup py={2}>
              <InputLeftAddon w={32}>Amount</InputLeftAddon>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isInvalid={!isAmountValid}
              />
            </InputGroup>
            <Text color="black" fontSize={"medium"}>
                Available Balance: {allowedAmount.data}
            </Text>
            {!isAmountValid && (
              <Text color='tomato' fontSize={"smaller"} px={2}>
                Please enter a valid amount
              </Text>
            )}
            {amount > allowedAmount.data ? <Text color="tomato" fontSize={"smaller"} px={2}>
              Too low balance!
            </Text>
            : null}
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
