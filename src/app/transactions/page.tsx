"use client"
import React, { useRef } from "react";
import Head from "next/head"; // Import Head component
import {
  Button,
  Table,
  Text,
  Box,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { HiDownload } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";

//import the data
import { transactions } from "./data";
import TransactionItem from "./TransactionItem";
import TransactionDetail from "./TransactionDetail";

type Props = {};

const Page = (props: Props) => {
  let lastDate = useRef(null);

  return (
    <>
      <Flex justifyContent="center">
        <Box w="50%" py={4}>
          <Text>Transactions page</Text>
          <Box display="flex" justifyContent="space-between">
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
          <TableContainer alignSelf="center">
            <Table variant="simple" size="sm">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th w={23} display="flex" textTransform="capitalize">
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
                {transactions.map((transaction, index) => {
                  let showDateProp: boolean;
                  if (lastDate.current === transaction.date) {
                    showDateProp = false;
                  } else {
                    showDateProp = true;
                    lastDate.current = transaction.date;
                  }

                  return (
                    <TransactionItem
                      showDateProp={showDateProp}
                      key={index}
                      {...transaction}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <TransactionDetail />
      </Flex>
    </>
  );
};

export default Page; // Changed "page" to "Page" for naming consistency
