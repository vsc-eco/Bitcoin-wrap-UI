"use client";
import React, { useContext, useLayoutEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { BiCopy } from "react-icons/bi";
import { hash160, sha256 } from "bitcoinjs-lib/src/crypto";
import { useCreateTx } from "../hooks/VSC";
import ProgressBar from "./ProgressBar";

import { useQRCode } from "next-qrcode";

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
  Icon,
  Link,
} from "@chakra-ui/react";
import bs58check from "bs58check";
import { MyContext } from "../context/TokenTransferContext";
import { useAccountContext } from "../context/AccountContext";

const WP_PUB =
  "034240ccd025374e0531945a65661aedaac5fff1b2ae46197623e594e0129e8b13";

function compileScript(pubKey, addrKey) {
  return Buffer.from(`21${pubKey}ad20${addrKey}`, "hex");
}

type Props = {
  dest: {
    username: string;
    did: string;
  };
};



const DepositModal = (props: Props) => {
  const { myAuth } = useAccountContext();
  let response;
  if(typeof window !== "undefined"){
    response = JSON.parse(window!.localStorage.getItem("login.auth")!)[
      "authId"
    ].split(":")[1];
  }

  let encodedAddr;
  if (props?.dest?.did) {
    const scriptHash = hash160(
      compileScript(
        WP_PUB,
        sha256(Buffer.from(props?.dest?.did)).toString("hex")
      )
    );

    let addr = new Uint8Array(21);
    addr.set([0x05]);
    addr.set(scriptHash, 1);
    encodedAddr = bs58check.encode(addr);
  }

  console.log("myDid:61", myAuth);
  const { registerAddr } = useCreateTx();
  useLayoutEffect(() => {
    if (props.dest.did) {
      registerAddr({
        addr: props.dest.did,
        encodedAddr,
        did: myAuth,
      });
    }
  }, [props.dest.did, myAuth]);

  //for qr code
  const { Image } = useQRCode();

  const { myValue, updateValue } = useContext(MyContext)!;

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Card
          maxW="800px"
          maxH="900px"
          w={["380px", "480px", "580px", "680px"]}
          m={["0", "0", "1", "4"]}
          boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        >
          <CardBody
            pb={["1", "2", "4", "6"]}
            my={["1", "2", "4", "4"]}
            mx={["1", "2", "4", "6"]}
          >
            <Container display="flex" justifyContent="space-between" maxW={600}>
              <Text fontSize={["8px", "10px", "12px", "16px"]}>
                Exchange ID: {encodedAddr}
              </Text>
              <a style={{ cursor: "pointer" }}>
                <Flex alignItems="center">
                  <Icon
                    as={FaClipboardQuestion}
                    boxSize={["12px", "12px", "16px", "18px"]}
                  />
                  <Link
                    href="https://discord.gg/6DtpaSHM"
                    fontSize={["8px", "10px", "12px", "16px"]}
                    target="_blank"
                  >
                    Need help?
                  </Link>
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

            <Container display="flex" py={["1", "2", "3", "4"]} maxW={600}>
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
                  {myValue! - 0.00016}
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
                <Image
                  text={`bitcoin:${encodedAddr}`}
                  options={{
                    type: "image/jpeg",
                    quality: 0.3,
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 2,
                    width: 100,
                    color: {
                      dark: " #000000",
                      light: "#FFFFFF",
                    },
                  }}
                />

                <Text
                  fontSize={["8px", "10px", "12px", "14px"]}
                  maxW={48}
                  isTruncated
                >
                  {encodedAddr}
                </Text>

                <Flex alignItems="center">
                  <Link href={`https://mempool.space/address/${encodedAddr}`} size={["xs", "sm", "l"]} px={["2"]} target="_blank">
                    <CiShare1 color="black" fontWeight="bold" />
                  </Link>
                  <Button size={["xs", "sm", "l"]} px={["2"]}>
                    <BiCopy color="black" fontWeight="bold" onClick={() => {navigator.clipboard.writeText(encodedAddr)}} />
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
              <Text
                fontWeight="bold"
                mx={4}
                fontSize={["12px", "14px", "16px", "18px"]}
              >
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
                  {myValue! - 0.0016}
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
                  Recipient:
                </Text>
              </Container>
              <Container w="70%" display="flex" alignItems="center">
                <Text
                  fontSize={["8px", "10px", "12px", "14px"]}
                  py={1}
                  isTruncated
                >
                  {response}
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
