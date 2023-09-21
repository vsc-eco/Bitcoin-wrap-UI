"use client";
import React, { use } from "react";
import { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { BiCopy } from "react-icons/bi";
import { IoReloadCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import { RiSendPlaneLine } from "react-icons/ri";

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
  FormLabel,
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
                <Text fontSize="sm" fontWeight="bold">
                  Send deposit
                </Text>
              </Container>
              <Container w="70%" style={{ display: "flex" }}>
                <FaBitcoin size="1.5em" color="#F7931A" />
                <Text fontSize="l" style={{ padding: "0px 7px" }}>
                  0.1 WBTC
                </Text>
              </Container>
            </Container>
            {/* This is for QR  */}
            <Container style={{ display: "flex" }} py={4}>
              <Container w="30%" style={{ display: "flex" }}>
                <Text fontSize="sm" fontWeight="bold">
                  Deposit address
                </Text>
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
                  <CiShare1 color="grey" />
                  <BiCopy color="grey" />
                </Flex>
              </Container>
            </Container>
            <hr />
            <Flex justifyContent="space-around" py={8} alignItems="center" maxW="800px" fontSize="xs" ml={4}>
              <Container >
                <Flex mx={12}>
                  <MdPending style={{ fontSize: "30px" }} color="#202A44" />
                </Flex>
                <Text align="center">Pending deposit</Text>
              </Container>
      
              <Container>
                <Flex mx={12}>
                  <IoReloadCircleSharp
                    style={{ fontSize: "30px" }}
                    color="#202A44"
                  />
                </Flex>
                <Text align="center">Confirming</Text>
              </Container>
          
              <Container>
                <Flex mx={12}>
                  <TbExchange
                    style={{
                      fontSize: "25px",
                      transform: "rotate(90deg)",
                      backgroundColor: "#202A44",
                      padding: "2px",
                      borderRadius: "12px",
                    }}
                    color="white"
                  />
                </Flex>
                <Text align="center">Exchanging</Text>
              </Container>
              
              <Container>
                <Flex mx={12}>
                  <RiSendPlaneLine
                    style={{
                      fontSize: "25px",
                      backgroundColor: "#202A44",
                      padding: "2px",
                      borderRadius: "12px",
                    }}
                    color="white"
                  />
                </Flex>
                <Text align="center">Sending</Text>
              </Container>
            </Flex>

            <Container pt={8} pb={4}>
              <Text py={8} fontWeight="bold" fontSize="xl">
                Operation details
              </Text>
            </Container>

            <Flex px={10} py={4}>
              <Container w="30%">
                <Text fontSize="sm">You get:</Text>
              </Container>
              <Flex w="70%" justifyContent="start">
                <FaBitcoin size="1.5em" color="#F7931A" />
                <FormLabel style={{ padding: "0px 7px" }}>0.1</FormLabel>
                <Text fontSize="sm" style={{ padding: "0px 7px" }}>
                   WBTC
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
              <Flex style={{ paddingTop: "4px" }}>
                <CiShare1 />
              </Flex>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
