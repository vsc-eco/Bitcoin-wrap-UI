"use client";
import React from "react";
import { FaBitcoin } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { BiCopy } from "react-icons/bi";
import ProgressBar from "./ProgressBar";
import { IoQrCode } from "react-icons/io5";


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
  Wrap,
  Icon,
  FormLabel,
  Img,
} from "@chakra-ui/react";

type Props = {};

const DepositModal = (props: Props) => {
  return (
    <>
      <Flex justifyContent="center" alignItems="center" >
        <Card maxW="800px" maxH="900px" w={["380px","480px","580px","680px"]} m={['0','0','1','4']} >
          <CardBody
            pb={["1", "2", "4", "6"]}
            my={["1", "2", "4", "4"]}
            mx={["1", "2", "4", "6"]}
          >
            <Container display="flex" justifyContent="space-between" maxW={600} >
              <Text fontSize={["8px", "10px", "12px", "16px"]}>
                Exchange ID: dkajklsnfhalkandlksd2324
              </Text>
              <a style={{ cursor: "pointer" }}>
                <Flex alignItems="center">
                  <Icon
                    as={FaClipboardQuestion}
                    boxSize={["12px", "12px", "16px", "18px"]}
                  />
                  <Text fontSize={["8px", "10px", "12px", "16px"]}>
                    Need help?
                  </Text>
                </Flex>
              </a>
            </Container>
            <CardHeader py={["4", "6", "8", "12"]}>
              <Center>
                <Text
                  fontSize={["12px", "16px", "20px", "24px"]}
                  fontWeight="bold"
                >
                  Awaiting your deposit
                </Text>
              </Center>
            </CardHeader>

            <Container display="flex" py={["1", "2", "3", "4"]} maxW={600} >
              <Container w="30%" display="flex" justifyContent="left">
                <Text
                  fontSize={["8px", "12px", "14px", "16px"]}
                  fontWeight="bold"
                >
                  Send deposit
                </Text>
              </Container>
              <Container w="70%" display="flex">
                <Icon
                  as={FaBitcoin}
                  boxSize={["16px", "18px", "20px", "24px"]}
                  color="#F7931A"
                />
                <Text fontSize={["9px", "11px", "13px", "16px"]} px={["2"]}>
                  0.1 WBTC
                </Text>
              </Container>
            </Container>
            {/* This is for QR  */}
            <Container display="flex" py={4} maxW={600}>
              <Container w="30%" display="flex">
                <Text
                  fontSize={["8px", "12px", "14px", "16px"]}
                  fontWeight="bold"
                >
                  Deposit address
                </Text>
              </Container>
              <Container
                w="75%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Here qr code will  placed  */}
              <Icon
              as={IoQrCode}
              boxSize={["20px", "22px", "24px", "42px"]}
              />

                <Text fontSize={["8px", "10px", "12px", "14px"]} maxW={48} isTruncated>
                  0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                </Text>

                <Flex alignItems="center">
                  <Button size={['xs','sm','l']} px={["2"]}>
                    <CiShare1 color="black" fontWeight="bold" />
                  </Button>
                  <Button size={['xs','sm','l']} px={["2"]}>
                    <BiCopy color="black" fontWeight="bold" />
                  </Button>
                </Flex>
              </Container>
            </Container>

            <Box
              justifyContent="space-evenly"
              py={8}
              alignItems="center"
              fontSize="xs"
              w="100%"
              maxW={600}
            >
              <ProgressBar />
            </Box>

            <Container
              py={["1", "2", "3", "4"]}
              px={["1", "2", "3", "4"]}
              maxW={600}
            >
              <Text fontWeight="bold"  mx={4} fontSize={["12px", "14px", "16px", "18px"]}>
                Operation details
              </Text>
            </Container>

            <Container display="flex" py={["1", "2", "3", "4"]} maxW={600}>
              <Container w="30%" display="flex" justifyContent="left">
                <Text
                  fontSize={["8px", "10px", "12px", "16px"]}
                  fontWeight="bold"
                >
                  You get:
                </Text>
              </Container>
              <Container w="70%" display="flex">
                <Icon
                  as={FaBitcoin}
                  boxSize={["16px", "18px", "20px", "24px"]}
                  color="#F7931A"
                />
                <Text fontSize={["9px", "11px", "13px", "16px"]} px={["2"]}>
                  0.1 WBTC
                </Text>
              </Container>
            </Container>

            <Container display="flex" py={["1", "2", "3", "4"]} maxW={600}>
              <Container w="30%" display="flex" justifyContent="left">
                <Text
                  fontSize={["8px", "10px", "12px", "16px"]}
                  py={1}
                  fontWeight="bold"
                >
                  Recipient Address:
                </Text>
              </Container>
              <Container w="70%" display="flex" alignItems="center">
                <Text
                  fontSize={["8px", "10px", "12px", "14px"]}
                  py={1}
                  isTruncated
                >
                  0x3434543434343cb3k243b4343knkml082j28902b
                </Text>
              </Container>
              <Flex alignItems="center">
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

export default DepositModal;
