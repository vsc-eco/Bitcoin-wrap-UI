import React from "react";
import { Tr, Td, WrapItem, Avatar, Text, Flex, Box , Button} from "@chakra-ui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const TransactionItem = ({ date, toFrom, amount, paymentMethod, pending }) => (
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
      <Text px={2} fontSize={["12px"]}>{toFrom}</Text>
      {pending && <Button variant="outline" size="xs" fontWeight="normal" fontSize={['12','6','8','10']}>Pending</Button>}
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

export default TransactionItem;
