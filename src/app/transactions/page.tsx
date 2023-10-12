import React from "react";
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

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Flex justifyContent="center">
        <Box w="50%" py={4}>
          <Text>Transactions page</Text>
          <Box display="flex" justifyContent="space-between">
            <Button alignItems="center">
              <CiFilter />
              <Text size="xs">Add Filter</Text>
            </Button>
            <Button alignItems="center">
              <HiDownload />
              Export
            </Button>
          </Box>
          <TableContainer alignSelf="center">
            <Table variant="simple" size="sm">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th w={23} textTransform="capitalize">
                    Date
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
                {transactions.map((transaction, index) => (
                  <TransactionItem key={index} {...transaction} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default Page; // Changed "page" to "Page" for naming consistency
