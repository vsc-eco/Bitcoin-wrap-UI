"use client";
import React, { useRef, useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { HiDownload } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { gql } from "@apollo/client";
import Axios from "axios";

//import the css
// import "./Transaction.css"
//import the data
// import { transactions } from "./data";
import TransactionItem from "./TransactionItem";
import TransactionDetail from "./TransactionDetail";

//graphql code for the integration of api
import { client } from "../apollo/client";
import { useQuery } from "@apollo/client";
import { transactions } from "./data";

//fetching the details

const query = gql`
  query MyQuery {
    findTransaction(
      filterOptions: {
        byAccount: "did:key:z6MkrKziBAfgGEywLj1v3PfJmkxdtsBPwq2FC1HghCpZZ7Yg"
        byAction: "applyTx"
      }
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
      }
    }
  }
`;

function useBitcoinPrice() {
  const [price, setPrice] = useState();

  useEffect(() => {
    void (async () => {
      const { data } = await Axios.get(`/api/bitcoin_price`);
      console.log(data);
      setPrice(data.price);
    })();
  }, []);

  return price;
}

type Props = {};

const Transaction = (props: Props) => {
  let lastDate = useRef(null);

  //useState
  const [isTransactionDetailOpen, setTransactionDetailOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data } = useQuery(query, {
    variables: {},
  });
  const bitcoinPrice = useBitcoinPrice();
  const items = data?.findTransaction?.txs || [];
  // console.log('transactions', items)

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
              <Text size="xs" fontSize="xs">
                Add Filter
              </Text>
            </Button>
            <Button alignItems="center">
              <HiDownload />
              <Text fontSize="xs">Export</Text>
            </Button>
          </Box>
          <Box overflowY="auto">
            <TableContainer alignSelf="center">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th w={32} display="flex" textTransform="capitalize">
                      <Text px="1">Date</Text>
                      <Text fontSize="10px">(GMT +5:30)</Text>
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
                    const newTransaction: any = {
                      date: new Date(
                        transaction.first_seen
                      ).toLocaleDateString(),
                      amount: transaction.decoded_tx.amount,
                    };

                    if (bitcoinPrice) {
                      newTransaction.dollar = Number(
                        (transaction.decoded_tx.amount * bitcoinPrice).toFixed(
                          2
                        )
                      );
                    }
                    //loop for assigning all the values to new object
                    for (var k in transaction) {
                      newTransaction[k] = transaction[k];
                    }

                    //logic for the same dates
                    let showDateProp: boolean;
                    if (lastDate.current === newTransaction.date) {
                      showDateProp = false;
                    } else {
                      showDateProp = true;
                      lastDate.current = newTransaction.date;
                    }

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

export default Transaction; // Changed "page" to "Page" for naming consistency
