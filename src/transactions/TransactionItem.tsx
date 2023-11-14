"use client";
import React, { useEffect, useState } from "react";
import {
  Tr,
  Td,
  WrapItem,
  Avatar,
  Text,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { transactions } from "./data";

//graphql code for the integration of api
import { gql } from "@apollo/client";
import client from "../apollo/client";

//fetching the details
client.query({
  query: gql`
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
  `,
}).then((result) => console.log(result))

const TransactionItem = ({
  showDateProp,
  handleTransactionOpen,
  ...transaction
}) => {
  const [showDate, setShowDate] = useState(showDateProp);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  function handleMouseEnter() {
    //if showDate is false then make it true
    if (!showDateProp) {
      setShowDate(true); //updating the state not the prop
    }
  }

  function handleMouseLeave() {
    if (!showDateProp) {
      setShowDate(false);
    }
  }

  //function for toggling the transaction detail modal
  const handleTransactionClick = () => {
    setSelectedTransaction(transaction);
    handleTransactionOpen();
  };

  return (
    <Tr
      _hover={{ bg: "blue.100" }}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTransactionClick}
    >
      <Td w={22}>{showDate ? transaction.date : null}</Td>

      <Td display="flex" alignItems="center" w={412} h={12}>
        <WrapItem>
          <Avatar name="Coffe Fondo" src={transaction.avatarUrl} size="sm" />
        </WrapItem>
        <Text px={2} fontSize={["12px"]}>
          {transaction.toFrom}
        </Text>
        {transaction.pending && (
          <Button
            variant="outline"
            size="xs"
            fontWeight="normal"
            fontSize={["12", "6", "8", "10"]}
          >
            Pending
          </Button>
        )}
      </Td>
      <Td isNumeric>
        {transaction.amount}
        &nbsp; (${transaction.dollar})
      </Td>

      <Td>
        <Flex>
          {transaction.paymentMethod === "Transfer" &&
          transaction.TransferIn ? (
            <BsArrowLeft />
          ) : transaction.paymentMethod === "Transfer" &&
            !transaction.TransferIn ? (
            <BsArrowRight />
          ) : null}
          <Text>{transaction.paymentMethod}</Text>
        </Flex>
      </Td>
    </Tr>
  );
};

export default TransactionItem;
  