import React from "react";
import { Tr, Td, WrapItem, Avatar, Text, Flex } from "@chakra-ui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const TransactionItem = ({ date, toFrom, amount, paymentMethod }) => (
  <Tr _hover={{ bg: "blue.100" }} cursor="pointer">
    <Td>{date}</Td>
    <Td display="flex" alignItems="center">
      <WrapItem>
        <Avatar
          name="Kola Tioluwani"
          src="https://bit.ly/tioluwani-kolawole"
          size="sm"
        />
      </WrapItem>
      <Text px={2}>{toFrom}</Text>
    </Td>
    <Td isNumeric>{amount}</Td>
    <Td>
      <Flex>
        {paymentMethod === "Transfer" ? <BsArrowLeft /> : <BsArrowRight />}
        <Text>{paymentMethod}</Text>
      </Flex>
    </Td>
  </Tr>
);

export default TransactionItem;
