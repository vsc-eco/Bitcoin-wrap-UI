"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Container,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import { BiSolidLockOpenAlt } from "react-icons/bi";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";

type Props = {};

const ExchangeModal = (props: Props) => {
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <>
      <Flex justifyContent="center" py={8} alignItems="center">
        <Card bg="white" maxW="800px" maxH="900px" w="680px" m={4}>
          <CardHeader>
            <Center fontWeight="bold">Add exchange details</Center>
          </CardHeader>
          <CardBody pb={6} my={4} mx={16}>
            <FormControl my={4}>
              <InputGroup size="sm">
                <InputLeftAddon h={12} w={28}>
                  <span>You Send</span>
                </InputLeftAddon>

                <Input
                  h={12}
                  w={300}
                  placeholder="0.0"
                  value={token1Amount}
                  onChange={(e) => setToken1Amount(e.target.value)}
                  focusBorderColor="transparent"
                  textAlign="right"
                  border="none"
                />
                <Flex alignItems="center" paddingLeft="8px">
                  <FaBitcoin size="1.5em" color="#F7931A" />
                  <span style={{ paddingLeft: "12px", fontWeight: "bold" }}>
                    {" "}
                    BTC
                  </span>
                </Flex>
              </InputGroup>
            </FormControl>
            <Flex style={{ justifyContent: "space-between" }}>
              <Flex>
                <BiSolidLockOpenAlt />
                <Text fontSize="sm" px={1}>
                  Floating rate
                </Text>
              </Flex>
              <Button _hover={{ bg: "brand.500", color: "white" }}>
                <TbExchange />
              </Button>
            </Flex>
            <FormControl my={4}>
              <InputGroup size="sm">
                <InputLeftAddon h={12} w={28}>
                  <span>You Got</span>
                </InputLeftAddon>

                <Input
                  h={12}
                  w={300}
                  placeholder="0.0"
                  value={token2Amount}
                  onChange={(e) => setToken2Amount(e.target.value)}
                  focusBorderColor="transparent"
                  textAlign="right"
                  border="none"
                />
                <Flex alignItems="center" paddingLeft="8px">
                  <FaBitcoin size="1.5em" color="#F7931A" />
                  <span style={{ paddingLeft: "12px", fontWeight: "bold" }}>
                    (W)BTC
                  </span>
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl mt={8}>
              <FormLabel>
                <Text fontWeight="bold" mx={2}>
                  Enter HIVE username
                </Text>
                <Flex alignItems="center">
                  <Text
                    style={{ position: "absolute", top: "30px", left:"10px" }}
                    fontSize="xs"
                  >
                    The recipients hive username
                  </Text>
                  <Input
                    mt={1}
                    w="90%"
                    h="56px"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    focusBorderColor="transparent"
                    border="none"
                  />
                  <Button _hover={{ bg: "brand.500", color: "white" }}>
                    <MdCancelPresentation color="black" />
                  </Button>
                </Flex>
                <Text fontSize="xs" color="red" px={4}>
                  HIVE account doesnt exists!
                </Text>

                <Flex py={4}>
                  <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontSize="xs"
                          >
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
              </FormLabel>
            </FormControl>
            <Button
              colorScheme="blue"
              my={4}
              mb={4}
              w="100%"
              onClick={() => alert("button has been clicked :)")}
            >
              Swap
            </Button>
            <Text
              style={{
                fontSize: "9px",
                textAlign: "center",
                paddingBottom: "12px",
              }}
            >
              By Clicking Create an exchange, I agree to the Privacy Policy and
              Terms of Service
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default ExchangeModal;
