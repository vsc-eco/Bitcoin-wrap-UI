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
  Container,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import {BiSolidLockOpenAlt} from "react-icons/bi"
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
          <ModalBody pb={6} my={4} mx={8}>
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
                  focusBorderColor="transparent"
                  textAlign="right"
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "8px",
                  }}
                >
                  <FaBitcoin size="1.5em" color="#F7931A" />
                  <span style={{ paddingLeft: "12px", fontWeight:"bold"}}> BTC</span>
                </div>
              </InputGroup>
            </FormControl>
            <Container style={{display:"flex", justifyContent:"space-between"}}>
              <div>
              <BiSolidLockOpenAlt />
              <Text fontSize='sm'>Floating rate</Text>
              </div>
              <TbExchange/>
            </Container>
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
                  focusBorderColor="transparent"
                  textAlign="right"
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "8px",
                  }} 
                >
                  <FaEthereum size="1.5em" color="#3c3c3d" />
                  <span style={{ paddingLeft: "12px", fontWeight:"bold" }}> ETH</span>
                </div>
              </InputGroup>
            </FormControl>
            <FormControl my={8}>
              <FormLabel>
                <Text fontWeight="bold">Enter the wallet address</Text>
                <div style={{ display: "flex", alignItems: "center" }}>
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
                    focusBorderColor="transparent"
                  />
                  <MdCancelPresentation />
                </div>
              </FormLabel>
            </FormControl>
            <Button
              colorScheme="blue"
              my={4}
              mb={4}
              w="100%"
              onClick={handleClose}
            >
              Swap
            </Button>
            <p
              style={{
                fontSize: "9px",
                textAlign: "center",
                paddingBottom: "12px",
              }}
            >
              By Clicking Create an exchange, I agree to the Privacy Policy and
              Terms of Service
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExchangeModal;