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
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useShowComponent } from "../context/ShowComponent";
import { DHive } from "../const";

type Props = {
  setDest: Function;
};

const ExchangeModal = (props: Props) => {
  
  const [walletAddress, setWalletAddress] = useState("");
  const [swapButtons, setSwapButtons] = useState(true);
  const [validAccount, setValidAccount] = useState(false);
  const { toggleShowComponent } = useShowComponent();
  const [tokenAmount, setTokenAmount] = useShowComponent();
  

  function swapButtonsOnExchange() {
    setSwapButtons(!swapButtons);
  }

  // const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: ["account_status", walletAddress],
    queryFn: async () => {
      try {
        const [account] = await DHive.database.getAccounts([walletAddress]);
        console.log(account);
        if (account) {
          const json = JSON.parse(account.posting_json_metadata);
          if (json.did) {
            if (props.setDest) {
              props.setDest(json.did);
            }
            setValidAccount(true);
          } else {
            setValidAccount(false);
          }
        } else {
          setValidAccount(false);
        }
      } catch {
        setValidAccount(false);
      }
      return true;
    },
  });
  console.log(query);

  return (
    <>
      <Flex justifyContent="center" py={8} alignItems="center">
        <Card
          bg="white"
          maxW="800px"
          h="60vh"
          maxH={"60vh"}
          w={["400px", "500px", "680px", "800px"]}
          m={["0", "0", "1", "3"]}
        >
          <CardHeader>
            <Center fontWeight="bold">Add exchange details</Center>
          </CardHeader>
          <CardBody
            pb={["1", "2", "4", "6"]}
            mx={["1", "2", "4", "8"]}
            background="#f5f9fa"
            maxH={"50vh"}
            borderRadius="10px"
          >
            <Box px={8} borderRadius={6}>
              <FormControl>
                <InputGroup size="sm">
                  <InputLeftAddon
                    h={["8", "12", "12", "12"]}
                    w="25%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderTopLeftRadius={6}
                    borderBottomLeftRadius={6}
                    background="#dff0f5"
                    border="2px solid #dff0f5"
                  >
                    <Text>You Send</Text>
                  </InputLeftAddon>

                  <Input
                    isInvalid={!tokenAmount}
                    h={["8", "12", "12", "12"]}
                    w="75%"
                    placeholder="0"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(Number(e.target.value))}
                    textAlign="right"
                    borderRadius={6}
                    background="#dff0f5"
                    focusBorderColor="transparent"
                  />
                  {swapButtons && (
                    <Flex alignItems="center" paddingLeft="8px">
                      <FaBitcoin size="1.5em" color="#F7931A" />
                      <span style={{ paddingLeft: "12px", fontWeight: "bold" }}>
                        {" "}
                        BTC
                      </span>
                    </Flex>
                  )}
                  {!swapButtons && (
                    <Flex alignItems="center" paddingLeft="4px">
                      <FaBitcoin size="1.5em" color="#F7931A" />
                      <span style={{ paddingLeft: "4px", fontWeight: "bold" }}>
                        WBTC
                      </span>
                    </Flex>
                  )}
                </InputGroup>
              </FormControl>
              <Flex style={{ justifyContent: "space-between" }}>
                <Flex alignItems="center">
                  <Box background="#c1f5e6" borderRadius={12} p={1}>
                    <BiSolidLockOpenAlt />
                  </Box>
                  <Text fontSize={["10px", "10px", "12px", "14px"]} px={1}>
                    Floating rate
                  </Text>
                </Flex>
                <Button _hover={{ bg: "brand.500", color: "white" }}>
                  <TbExchange onClick={swapButtonsOnExchange} />
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
                    borderTopLeftRadius={6}
                    borderBottomLeftRadius={6}
                    background="#dff0f5"
                    border="2px solid #dff0f5"
                  >
                    <Text>You Get</Text>
                  </InputLeftAddon>
                  <Input
                    isRequired
                    h={["8", "12", "12", "12"]}
                    w="75%"
                    textAlign="right"
                    borderRadius={6}
                    border="transparent"
                    background="#dff0f5"
                    readOnly
                    value={tokenAmount! - 0.00016}
                  ></Input>
                  {!swapButtons && (
                    <Flex alignItems="center" paddingLeft="8px">
                      <FaBitcoin size="1.5em" color="#F7931A" />
                      <span style={{ paddingLeft: "12px", fontWeight: "bold" }}>
                        {" "}
                        BTC
                      </span>
                    </Flex>
                  )}
                  {swapButtons && (
                    <Flex alignItems="center" paddingLeft="4px">
                      <FaBitcoin size="1.5em" color="#F7931A" />
                      <span style={{ paddingLeft: "4px", fontWeight: "bold" }}>
                        WBTC
                      </span>
                    </Flex>
                  )}
                </InputGroup>
              </FormControl>
            </Box>

            <Box px={8} my={4} borderRadius={6}>
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
                      isRequired
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
                      _hover={{ bg: "brand.500", color: "white" }}
                      mx={["1", "2", "3", "4"]}
                    >
                      <MdCancelPresentation color="black" />
                    </Button>
                  </Flex>

                  {validAccount ? (
                    <Text
                      fontSize={["8px", "10px", "12px", "14px"]}
                      color="green"
                    >
                      Account exists!
                    </Text>
                  ) : (
                    <Text
                      fontSize={["8px", "10px", "12px", "14px"]}
                      color="red"
                    >
                      HIVE account must be registered on this web portal.
                    </Text>
                  )}

                  <Flex py={2} w="100%">
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
                            <Text fontSize="xs">Bitcoin Mainnet Fee</Text>
                            <Text fontSize="xs" px={12}>
                              0.00016 BTC ($6)
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
              mb={4}
              w="100%"
              onClick={toggleShowComponent}
              isDisabled={tokenAmount === 0 && !validAccount }
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
