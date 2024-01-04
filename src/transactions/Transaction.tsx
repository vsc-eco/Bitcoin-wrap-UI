"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import Head from "next/head"; // Import Head component
import {
  Button,
  Table,
  Text,
  Box,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HiDownload } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { ErrorPolicy, gql } from "@apollo/client";
import Axios from "axios";
import Moment from "moment";

//import the css
// import "./Transaction.css"
//import the data
// import { transactions } from "./data";
import TransactionItem from "./TransactionItem";
import TransactionDetail from "./TransactionDetail";

//graphql code for the integration of api
import { client } from "../apollo/client";
import { useQuery } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AccountContext, useAccountContext } from "../context/AccountContext";
import TransferModal from "../components/TransferModal";
import RedeemModal from "../components/RedeemModal";
import { useCreateTx } from "../hooks/VSC";

//fetching the details

const BTC_TOKEN_CONTRACT = "59dfb8383291734049bfab403ced85a57cbcde6a";

const query = gql`
  query MyQuery($did: String) {
  findLedgerTXs(
    byToFrom: $did
    byContractId: "${BTC_TOKEN_CONTRACT}"
  ) {
    txs {
      first_seen
      executed_in
      id
      status
      type
      included_in
      local
      op
      decoded_tx
      redeem
    }
  }
}
`;

function useBitcoinPrice() {
  const [price, setPrice] = useState();

  useLayoutEffect(() => {
    void (async () => {
      const { data } = await Axios.get(`/api/bitcoin_price`);
      setPrice(data.price);
    })();
  }, []);

  return price;
}

type Props = {};

const Transaction = (props: Props) => {
  const { transfer } = useCreateTx();
  const { triggerLoginWithHive, myDid, myAuth } = useAccountContext();
  let lastDate = useRef(null);


  //useState
  const [isTransactionDetailOpen, setTransactionDetailOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useLayoutEffect(() => {
    if (myDid) {
      //   transfer({
      //     dest: "did:key:z6MkryiH1U2zQ344Rtuq1iwk8xY5Fhf9Kwb4Xiwf7gbcZE2L",
      //     did: myDid,
      //     didAuth:myAuth,
      //     amount: 0.0001
      // })
    }
  }, [myDid]);

  const { data, refetch } = useQuery(query, {
    variables: {
      did: myDid,
    },
    errorPolicy: "ignore",
  });

  useLayoutEffect(() => {
    const pid = setInterval(() => {
      refetch();
    }, 15_000);
    return () => {
      clearInterval(pid);
    };
  });

  const bitcoinPrice = useBitcoinPrice();
  const items = data?.findLedgerTXs?.txs || [];
  console.log("items", items, data);

  //function for handling the state
  const handleTransactionOpen = (transaction) => {
    setTransactionDetailOpen(true);
    setSelectedTransaction(transaction);
  };

  //function for closing the modal again
  const handleTransactionClose = () => {
    setTransactionDetailOpen(false);
  };

    return (
      <>
        <Flex justifyContent="center" h="90vh">
          <Flex
            direction="column"
            py={4}
            textAlign={"center"}
            bgColor={"white"}
            p={8}
            borderRadius={8}
            margin="auto"
            maxW={["250px", "350px", "550px", "950px"]}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            minH="60vh"
          >
            <Text fontSize="l" fontWeight={"bolder"}>
              Transactions
            </Text>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Button alignItems="center">
                <CiFilter />
                <Text size="s" fontSize="xs">
                  Add Filter
                </Text>
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  fontSize="xs"
                >
                  Actions
                </MenuButton>
                <MenuList style={{ minWidth: "100%" }}>
                  <MenuItem>
                    <TransferModal refetch={refetch} />
                  </MenuItem>
                  <MenuItem>
                    <RedeemModal />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box overflowY="auto">
              <TableContainer alignSelf="center">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th w={32} display="flex" textTransform="capitalize">
                        <Text px="1">Date</Text>
                        <Text fontSize="10px">(Local Time)</Text>
                      </Th>
                      <Th textTransform="capitalize">To/From</Th>
                      <Th isNumeric textTransform="capitalize">
                        Amount
                      </Th>
                      <Th
                        textTransform="capitalize"
                        display="flex"
                        alignItems="center"
                      >
                        Payment Method
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items.map((transaction, index) => {
                      //making a separate object for the adding the date property to the transactions
                      let date;
                      console.log(
                        "transaction.first_seen",
                        transaction.first_seen
                      );
                      if (typeof transaction.first_seen === "string") {
                        date = new Date(transaction.first_seen);
                      } else {
                        date = new Date(transaction.first_seen);
                      }
                      const newTransaction: any = {
                        date: date,
                        amount: transaction.decoded_tx.amount,
                        amountPrefix: "BTC",
                      };

                      if (bitcoinPrice) {
                        newTransaction.dollar = Number(
                          (
                            transaction.decoded_tx.amount * bitcoinPrice
                          ).toFixed(2)
                        );
                      }
                      //loop for assigning all the values to new object
                      for (var k in transaction) {
                        newTransaction[k] = transaction[k];
                      }
                      // console.log('newTransaction', newTransaction)
                      if (newTransaction.decoded_tx.action === "mint") {
                        newTransaction[
                          "toFrom"
                        ] = `Incoming wrap (#${transaction.decoded_tx.tx_id.slice(
                          0,
                          8
                        )}...${transaction.decoded_tx.tx_id.slice(
                          transaction.decoded_tx.tx_id.length - 8
                        )})`;
                        newTransaction["paymentMethod"] = "Incoming wrap";
                        newTransaction.TransferIn = true;
                        newTransaction.avatarUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png`;
                      } else if (
                        newTransaction.decoded_tx?.action === "applyTx"
                      ) {
                        const memo = JSON.parse(transaction.decoded_tx.memo);
                        // console.log(memo)
                        // console.log(newTransaction.decoded_tx)
                        if (
                          newTransaction.decoded_tx.dest === myDid &&
                          newTransaction.decoded_tx.from === myDid
                        ) {
                          newTransaction["paymentMethod"] = "Self transfer";
                          newTransaction[
                            "toFrom"
                          ] = `${memo.from} (${memo.msg})`;
                          newTransaction.avatarUrl = `https://images.hive.blog/u/${
                            memo.to || memo.from
                          }/avatar`;
                          newTransaction.TransferIn = true;
                        } else if (newTransaction.decoded_tx.dest === myDid) {
                          newTransaction["paymentMethod"] = "Incoming transfer";
                          newTransaction.avatarUrl = `https://images.hive.blog/u/${memo.from}/avatar`;
                          newTransaction[
                            "toFrom"
                          ] = `${memo.from} (${memo.msg})`;
                          newTransaction.TransferIn = true;
                        } else {
                          newTransaction["paymentMethod"] = "Outgoing transfer";
                          newTransaction["toFrom"] = `${memo.to} (${memo.msg})`;
                          newTransaction.avatarUrl = `https://images.hive.blog/u/${memo.to}/avatar`;
                          newTransaction.TransferIn = false;
                        }
                        newTransaction["memo"] = memo.msg;
                      }

                      //logic for the same dates
                      let showDateProp: boolean;
                      if (
                        lastDate.current ===
                        Moment(newTransaction.date).format("D MMM")
                      ) {
                        showDateProp = false;
                      } else {
                        showDateProp = true;
                        lastDate.current = Moment(newTransaction.date).format(
                          "D MMM"
                        ) as any;
                      }

                      console.log("ITEM IN TX LIST");

                      return (
                        <TransactionItem
                          showDateProp={showDateProp}
                          key={index}
                          transaction={newTransaction}
                          handleTransactionOpen={() =>
                            handleTransactionOpen(newTransaction)
                          }
                        />
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
          <Flex className="overlay">
            <Box
              className={`side-popup ${isTransactionDetailOpen} ? 'show-popup' : ''`}
            >
              {isTransactionDetailOpen && (
                <TransactionDetail
                  toggleClose={handleTransactionClose}
                  transaction={selectedTransaction}
                />
              )}
            </Box>
          </Flex>
        </Flex>
      </>
    );
};

export default Transaction;
