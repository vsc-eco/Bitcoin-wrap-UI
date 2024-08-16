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
import { getOutputs, useCreateTx } from "../hooks/VSC";
import { useQuery } from "@tanstack/react-query";
import { DHive } from "../const";

type Props = {
  refetch: Function;
};

const TransferModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  const isAmountValid = amount.trim() !== "" && /^\d*\.?\d*$/.test(amount); // Check if amount is not empty or only whitespace
  const { transfer } = useCreateTx();

  // const allowedAmount = useQuery({
  //   queryKey: ["transfer_balance", myDid],
  //   queryFn: async () => {
  //     const outputs = await getOutputs(myDid)
  //     const amount = outputs.map(e => e.balance).reduce((a, b) => {
  //       return a + b;
  //     })
  //     console.log('transferred allowed amount', amount)
  //     return amount;
  //   },
  // })

  const queryAccount = useQuery({
    queryKey: ["account_status", destination],
    queryFn: async () => {
      try {
        const [account] = await DHive.database.getAccounts([destination]);
        console.log(account);
        if (account) {
          const json = JSON.parse(account.posting_json_metadata);
          if (json.did) {
            return json.did;
          }
        }
      } catch {}
      return null;
    },
  });

  const isValidDestination = !!queryAccount.data;

  const isDisabled = !isValidDestination || true; //amount > allowedAmount.data

  const handleSend = async () => {
    // Add your logic to handle the "Send" button click

    // await transfer({
    //   amount: Number(amount),
    //   didAuth: myAuth,
    //   did: myDid,
    //   myHiveName,
    //   dest: queryAccount.data,
    //   destHive: destination
    // })
    if (props.refetch) {
      props.refetch();
    }
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
            {isValidDestination ? (
              <Text color="green" fontSize="xs" px={2}>
                Account found!
              </Text>
            ) : (
              <Text color="tomato" fontSize="xs" px={2}>
                Account must be registered on this web portal.
              </Text>
            )}
            <InputGroup py={4}>
              <InputLeftAddon w={32}>Amount</InputLeftAddon>
              <Input
                isRequired
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isInvalid={!isAmountValid}
              />
            </InputGroup>
            <Text color="black" fontSize={"medium"}>
              Available Balance: {"TODO"}
            </Text>
            {!isAmountValid && (
              <Text color="tomato" fontSize={"smaller"} px={2}>
                Please enter a valid amount
              </Text>
            )}
            {false ? (
              <Text color="tomato" fontSize={"smaller"} px={2}>
                Too low balance!
              </Text>
            ) : null}
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
