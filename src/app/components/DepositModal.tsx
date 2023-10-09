"use client";
import React from "react";
import { FaBitcoin } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { BiCopy } from "react-icons/bi";
import ProgressBar from "./ProgressBar";
import { IoQrCode } from "react-icons/io5";
import Image from "next/image";

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
  Accordion,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
} from "@chakra-ui/react";

type Props = {};

const DepositCard = (props: Props) => {
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Card maxW="800px" maxH="900px" w="680px" m={["0", "0", "1", "4"]}>
          <CardHeader
            py={["4", "6", "8", "12"]}
            display="flex"
            justifyContent="space-between"
          >
            {/* <Container display="flex" justifyContent="space-between" background="#ebf4f5" p={4}> */}
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
            {/* </Container> */}
          </CardHeader>
          <Center>
            <Text fontSize={["12px", "16px", "20px", "24px"]} fontWeight="bold">
              Awaiting your deposit
            </Text>
          </Center>
          <CardBody>
            <Container background="#ebf4f5" borderRadius={6} maxW={600} >
              <Container display="flex" py={["1", "2", "3", "4"]} maxW={600} >
                <Container w="30%" display="flex" justifyContent="left" maxW={600}>
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
                <Container w="30%" display="flex" maxW={600}>
                  <Text
                    fontSize={["8px", "12px", "14px", "16px"]}
                    fontWeight="bold"
                  >
                    Deposit address
                  </Text>
                </Container>
                <Container
                  w="70%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* Here qr code will  placed  */}
                  <Image
                    alt="qr code"
                    src="/qrcode.png"
                    width={100}
                    height={100}
                  />

                  <Text fontSize={["8px", "10px", "12px", "14px"]} isTruncated>
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                  </Text>

                  <Flex alignItems="center">
                    <Button size={["xs", "sm", "l"]} px={["2"]}>
                      <CiShare1 color="black" fontWeight="bold" />
                    </Button>
                    <Button size={["xs", "sm", "l"]} px={["2"]}>
                      <BiCopy color="black" fontWeight="bold" />
                    </Button>
                  </Flex>
                </Container>
              </Container>
            </Container>
            <Container
              py={8}
              alignItems="center"
              fontSize="xs"
              w="100%"
              maxW={600}
              background="#ebf4f5" borderRadius={6}
            >
              {/* This is box shadow  */}
              <Box
                as="hr"
                w="100%"
                h={0.3}
                bg="#8f8989" // Background color (optional)
                boxShadow="0px 3px 3px rgba(0, 0, 0, 0.25)" // Box shadow
                my={4}
               
              />

              <ProgressBar />
            </Container>

            <Container
              py={["1", "2", "3", "4"]}
              px={["1", "2", "3", "4"]}
              maxW={600}
              my={4}
              background="#ebf4f5"
              borderRadius={6}
            >
              <Text
                fontWeight="bold"
                mx={4}
                fontSize={["12px", "14px", "16px", "18px"]}
              >
                Operation details
              </Text>

              <Flex py={4} w="100%">
                <Accordion defaultIndex={[0]} allowMultiple w="100%">
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" fontSize="xs">
                          Fee Breakdown
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={2}>
                      <Flex justifyContent="space-between">
                        <Text fontSize="xs">Bridge fee</Text>
                        <Text fontSize="xs" px={12}>
                          0 BTC ($0.01)
                        </Text>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>

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
            </Container>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default DepositCard;
