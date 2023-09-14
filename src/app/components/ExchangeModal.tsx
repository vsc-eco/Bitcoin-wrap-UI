"use client";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Center,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {};

const ExchangeModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Swap tokens</Button>

      <Modal isOpen={isOpen} onClose={handleClose} w={22} h={22}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Add exchange details</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {/* <FormLabel>You Send</FormLabel> */}
              <InputGroup size="sm">
                <InputLeftAddon 
                h={12}
                children="You Send"
                />

                <Input 
                h={12}
                placeholder="0.0" 
                value={token1Amount}
                onChange={(e) => setToken1Amount(e.target.value) }
                />
                <InputRightAddon
                h={12}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
            <InputGroup size="sm">
                <InputLeftAddon 
                h={12}
                children="You got"
                />

                <Input 
                h={12}
                placeholder="0.0" 
                value={token2Amount}
                onChange={(e) => setToken2Amount(e.target.value) }
                />
                <InputRightAddon
                h={12}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={8}>
              <FormLabel>
                <h1>Enter the wallet address</h1>
                <Input
                mt={2}
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </FormLabel>
            </FormControl>
          </ModalBody>
          <Button colorScheme="blue" mr={3} ml={3} mb={3} onClick={handleClose}>
            Swap
          </Button> 
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExchangeModal;
