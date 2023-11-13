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


type Props = {};

const ExchangeModal = (props: Props) => {
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <>
      <Flex justifyContent="center" py={8} alignItems="center">
        <Card bg="white" maxW="800px" maxH="700px" w={["400px","500px","680px","800px"]}  m={['0','0','1','3']}>
          <CardHeader>
            <Center fontWeight="bold">Add exchange details</Center>
          </CardHeader>
          <CardBody
            pb={["1", "2", "4", "6"]}
            my={["1", "1", "2", "2"]}
            mx={["1", "2", "4", "8"]}
          >
            <Box
            background="#ebf4f5"
            px={8}
            py={4}
            borderRadius={6}
            >
            <FormControl my={["1", "2", "3", "4"]}>
              <InputGroup size="sm">
                <InputLeftAddon
                  h={["8", "12", "12", "12"]}
                  w="25%" 
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderTopLeftRadius={6}
                  borderBottomLeftRadius={6}
                  
                >
                  <Text>You Send</Text>
                </InputLeftAddon>

                <Input
                  h={["8", "12", "12", "12"]}
                  w="75%"
                  placeholder="0.0"
                  value={token1Amount}
                  onChange={(e) => setToken1Amount(e.target.value)}
                  textAlign="right"
                  border="2px solid #dff0f5"
                  borderRadius={6}
                  background="#dff0f5"
                  focusBorderColor="transparent"
                  
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
              <Flex alignItems="center">
                <Box background="#c1f5e6" borderRadius={12}>
                <BiSolidLockOpenAlt />
                </Box>
                <Text fontSize={["10px", "10px", "12px", "14px"]} px={1}>
                  Floating rate
                </Text>
              </Flex>
              <Button _hover={{ bg: "brand.500", color: "white" }}>
                <TbExchange />
              </Button>
            </Flex>
            <FormControl my={4}>
              <InputGroup size="sm">
                <InputLeftAddon
                  h={["8", "12", "12", "12"]}
                  w="25%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #E0E0E0"
                  borderTopLeftRadius={6}
                  borderBottomLeftRadius={6}
                  >
                  <Text>You Get</Text>
                </InputLeftAddon>

                <Input
                  h={["8", "12", "12", "12"]}
                  w="75%"
                  placeholder="0.0"
                  value={token2Amount}
                  onChange={(e) => setToken2Amount(e.target.value)}
                  textAlign="right"
                  borderRadius={6}
                  border="2px solid #dff0f5"
                  background="#dff0f5"
                  focusBorderColor="transparent"
                  />
                <Flex alignItems="center" paddingLeft="4px">
                  <FaBitcoin size="1.5em" color="#F7931A" />
                  <span style={{ paddingLeft: "4px", fontWeight: "bold" }}>
                    WBTC
                  </span>
                </Flex>
              </InputGroup>
            </FormControl>
            </Box>
            
            <Box background="#ebf4f5" py={2} px={8} my={4}
            borderRadius={6}
            >
            <FormControl>
              <FormLabel>
                <Text
                  fontWeight="bold"
                  fontSize={["12px", "16px", "18px", "20px"]}
                  >
                  Enter HIVE username
                </Text>
                <Flex alignItems="center" position="relative">
                  <Text
                    style={{ position: "absolute", top: "10px", left: "8px" }}
                    fontSize={["8px", "10px", "12px", "12px"]}
                    color="gray.600"
                    zIndex={5}
                    >
                    recipients hive username
                  </Text>
                  <Input
                    mt={1.5}
                    
                    h="60px"
                    fontWeight="bold"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    border="2px solid #dff0f5"
                    background="# "
                    borderRadius={8}
                    focusBorderColor="transparent"
                    
                    />
                  <Button
                    _hover={{ bg:"brand.500", color: "white" }}
                    mx={["1", "2", "3", "4"]}
                    >
                    <MdCancelPresentation color="black" />
                  </Button>
                </Flex>
                <Text fontSize={["8px", "10px", "12px", "14px"]} color="red">
                  HIVE account doesnt exists!
                </Text>

                <Flex py={4} w="100%">
                  <Accordion defaultIndex={[0]} allowMultiple w="100%">
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
            </Box>
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
