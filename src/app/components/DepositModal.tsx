"use client";
import React, { use } from "react";
import { useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { BiCopy } from "react-icons/bi";
import { MdPending } from "react-icons/md";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";

type Props = {};

const DepositModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Deposit</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="700px" maxH="900px">
          <ModalCloseButton />
          <ModalBody pb={6} my={4} mx={4}>
            <Container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text fontSize="sm">Exchange ID: dkajklsnfhalkandlksd2324</Text>
              <div style={{ display: "flex" }}>
                <FaClipboardQuestion />
                <Text fontSize="smaller">Need help?</Text>
              </div>
            </Container>
            <ModalHeader py={12}>
              <Center>
                <Text fontSize="2xl">Awaiting your deposit</Text>
              </Center>
            </ModalHeader>

            <Container style={{ display: "flex" }} py={4}>
              <Container w="30%">
                <Text fontSize="sm" fontWeight="bold">Send deposit</Text>
              </Container>
              <Container w="70%" style={{ display: "flex" }}>
                <FaBitcoin size="1.5em" color="F7931A" />
                <Text fontSize="l" style={{ padding: "0px 7px" }}>
                  0.1 BTC
                </Text>
              </Container>
            </Container>
            {/* This is for QR  */}
            <Container style={{ display: "flex" }} py={4}>
              <Container w="30%" style={{ display: "flex" }}>
                <Text fontSize="sm" fontWeight="bold">Deposit address</Text>
              </Container>
              <Container
                w="70%"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* Here qr code will be placed  */}
                <Text fontSize="sm" style={{ padding: "2px 7px" }}>
                0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                </Text>
                <Flex
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "60px",
                  }}
                >
                  <CiShare1  color="grey" />
                  <BiCopy color="grey"/>
                </Flex>
              </Container>
            </Container>
            <Container p={8}>
              <Flex mx={10}>
                <MdPending style={{fontSize: "30px"}} color="#202A44"/>
              </Flex>
              <Text>Pending deposit</Text>
            </Container>

            <Container pt={8} pb={4}>
              <Text py={8} fontWeight="bold" fontSize="xl">
                Operation details
              </Text>
            </Container>

            <Flex px={10} py={4}>
              <Container w="30%">
                <Text fontSize="sm">You get:</Text>
              </Container>
              <Flex w="70%" justifyContent="start" >
                <FaEthereum size="1.5em" color="#3c3c3d" />
                <Text fontSize="sm" style={{ padding: "0px 7px" }}>
                  0.1 BTC
                </Text>
              </Flex>
            </Flex>

            <Container display="flex" justifyContent="space-between" px={4}>
              <Text fontSize="sm" py={1}>
                Recipient Address
              </Text>
              <Text fontSize="sm" py={1}>
                0x3434543434343cb3k243b4343knkml082j28902b
              </Text>
              <Flex style={{paddingTop:"4px"}}>
              <CiShare1/>
              </Flex>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
