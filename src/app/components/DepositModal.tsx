"use client";
import React from "react";
import { FaBitcoin } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { BiCopy } from "react-icons/bi";
import ProgressBar from "./ProgressBar";
import { useBreakpointValue } from "@chakra-ui/media-query";

import {
  Button,
  Box,
  Card,
  CardHeader,
  CardBody,
  Center,
  Container,
  Flex,
  Text,
  FormLabel,
} from "@chakra-ui/react";

type Props = {};



const DepositCard = (props: Props) => {
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Card maxW="800px" maxH="900px" w="680px" m={4}>
          <CardBody pb={6} my={4} mx={4}>
            <Container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text fontSize="sm">Exchange ID: dkajklsnfhalkandlksd2324</Text>
              <a style={{ cursor: "pointer" }}>
                <div style={{ display: "flex" }}>
                  <FaClipboardQuestion />
                  <Text fontSize="sm">Need help?</Text>
                </div>
              </a>
            </Container>
            <CardHeader py={12}>
              <Center>
                <Text fontSize="2xl">Awaiting your deposit</Text>
              </Center>
            </CardHeader>

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
                <Text fontSize="sm" style={{ padding: "2px 0px" }}>
                  0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                </Text>
                <Flex
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "50px",
                  }}
                >
                  <Button size="l" px={1}>
                    <CiShare1 color="black" fontWeight="bold" />
                  </Button>
                  <Button size="l">
                    <BiCopy color="black" fontWeight="bold" />
                  </Button>
                </Flex>
              </Container>
            </Container>

            <Box
              justifyContent="space-evenly"
              py={8}
              alignItems="center"
              maxW="800px"
              fontSize="xs"
              w="100%"
            >
              {/* <Container>
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
              </Container> */}
              <ProgressBar  />
            </Box>

            <Container pt={8} pb={4}>
              <Text py={8} fontWeight="bold" fontSize="xl">
                Operation details
              </Text>
            </Container>

            <Flex px={4}>
              <Container w="30%">
                <Text fontSize="sm" mx={6}>
                  You get:
                </Text>
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
              <Flex style={{ alignItems: "center" }}>
                <a style={{ cursor: "pointer", paddingBottom: "2px" }}>
                  <CiShare1 />
                </a>
              </Flex>
            </Container>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default DepositCard;
