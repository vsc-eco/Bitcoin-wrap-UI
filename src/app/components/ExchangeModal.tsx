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
import { FaBitcoin, FaEthereum } from "react-icons/fa";
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

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="700px" maxH="900px">
          <ModalHeader>
            <Center>Add exchange details</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} my={4} mx={4}>
            <FormControl my={4}>
              <InputGroup size="sm">
                <InputLeftAddon h={12} w={28}>
                  <span>You Send</span>
                </InputLeftAddon>

                <Input
                  h={12}
                  placeholder="0.0"
                  value={token1Amount}
                  onChange={(e) => setToken1Amount(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "8px",
                  }}
                >
                  <FaBitcoin size="1.5em" />
                  <span style={{ paddingLeft: "12px" }}> BTC</span>
                </div>
              </InputGroup>
            </FormControl>
            <FormControl my={4}>
              <InputGroup size="sm">
                <InputLeftAddon h={12} w={28}>
                  <span>You Got</span>
                </InputLeftAddon>

                <Input
                  h={12}
                  placeholder="0.0"
                  value={token2Amount}
                  onChange={(e) => setToken2Amount(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "8px",
                  }}
                >
                  <FaEthereum size="1.5em" />
                  <span style={{ paddingLeft: "12px" }}> ETH</span>
                </div>
              </InputGroup>
            </FormControl>
            <FormControl my={8}>
              <FormLabel>
                <h1>Enter the wallet address</h1>
                <Input
                  mt={2}
                  w="90%"
                  h="56px"
                  placeholder="The recipient's ethereum address"
                  sx={{
                    "::placeholder": {
                      position: "relative",
                      top: "-14px",
                      fontSize: "12px",
                      fontWeight: "bold", // Adjust this value as needed
                    },
                  }}
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
