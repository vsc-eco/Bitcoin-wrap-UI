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
  toFrom,
  amount,
  paymentMethod,
  pending,
  showDateProp
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




  return (
    <Tr
      _hover={{ bg: "blue.100" }}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Td w={28}>{showDate ? date : null}</Td>

      <Td display="flex" alignItems="center">
        <WrapItem>
          <Avatar
            name="Kola Tioluwani"
            src="https://bit.ly/tioluwani-kolawole"
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
      <Td isNumeric>{amount} BTC</Td>

      <Td>
        <Flex>
          {paymentMethod === "Transfer" ? <BsArrowLeft /> : <BsArrowRight />}
          <Text>{paymentMethod}</Text>
        </Flex>
      </Td>
    </Tr>
  );
};

export default TransactionItem;
