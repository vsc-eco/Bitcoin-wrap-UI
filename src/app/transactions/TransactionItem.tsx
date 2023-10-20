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


const TransactionItem = ({
  date,
  avatarUrl,
  toFrom,
  amount,
  dollar,
  paymentMethod,
  pending,
  showDateProp,
  TransferIn,
  handleTransactionOpen
}) => {

  const [showDate, setShowDate] = useState(showDateProp)


  function handleMouseEnter() {
      //if showDate is false then make it true
      if(!showDateProp){
        setShowDate(true) //updating the state not the prop
      }
  }

  function handleMouseLeave() {
    if(!showDateProp){
      setShowDate(false)
    }
  }

  //function for toggling the transaction detail modal
  const handleTransactionClick =()=> {
    handleTransactionOpen();
  }

  return (
    <Tr
      _hover={{ bg: "blue.100" }}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTransactionClick}
    >
      <Td w={28}>{showDate ? date : null}</Td>

      <Td display="flex" alignItems="center">
        <WrapItem>
          <Avatar
            name="Coffe Fondo"
            src= {avatarUrl}
            size="sm"
          />
        </WrapItem>
        <Text px={2} fontSize={["12px"]}>
          {toFrom}
        </Text>
        {pending && (
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
      {amount}
      &nbsp; (${dollar})
      </Td>

      <Td>
        <Flex>
          {paymentMethod === "Transfer" && TransferIn ? <BsArrowLeft /> : paymentMethod === "Transfer" && !TransferIn ? <BsArrowRight /> : null}
          <Text>{paymentMethod}</Text>
        </Flex>
      </Td>
    </Tr>
  );
};

export default TransactionItem;
