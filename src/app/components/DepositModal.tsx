"use client";
import React, { use } from "react";
import { useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import {BiCopy} from "react-icons/bi"
import {MdPending} from "react-icons/md"

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

            <Container style={{display:"flex"}} py={4}>
              <Container w="30%">
                <Text fontSize="sk">Send deposit</Text>
              </Container>
              <Container w="70%" style={{display:"flex"}}>
                <FaBitcoin size="1.5em" color="F7931A" />
                <Text fontSize="l" style={{padding:"0px 7px"}}>0.1 BTC</Text>
              </Container>
            </Container>
           {/* This is for QR  */}
            <Container style={{display:"flex"}} py={4}>
              <Container w="30%" style={{display:"flex"}}>
                <Text fontSize="l">Deposit address</Text>
              </Container>
              <Container w="70%" style={{display:"flex", justifyContent:"space-between"}}>
                {/* Here qr code will be placed  */}
                <Text fontSize="l" style={{padding:"2px 7px"}}>fsdklsklsdsk</Text>
                <div style={{display:"flex"}}>
                <CiShare1 />
                <BiCopy />
                </div>
              </Container>
            </Container>
            <Container>
            <Container>
              <MdPending/>
            </Container>
              <Text>Pending deposit</Text>
            </Container>

            <Container>
              <Text py={8}>Operation details</Text>
            </Container>

            <Container style={{display:"flex"}} py={4}>
              <Container w="30%">
                <Text fontSize="l">You get:</Text>
              </Container>
              <Container w="70%" style={{display:"flex"}}>
                <FaEthereum size="1.5em" color="#3c3c3d" />
                <Text fontSize="sm" style={{padding:"0px 7px"}}>0.1 BTC</Text>
              </Container>
            </Container>

            <Container display="flex" justifyContent="space-between" px={4}>
              <Text>Recipient Address</Text>
              <Text>0x3434543434343cb3k243b4343knkml082j28902b</Text>
              <CiShare1 />
            </Container>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
