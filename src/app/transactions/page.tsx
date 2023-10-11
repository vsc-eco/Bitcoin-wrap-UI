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

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Flex justifyContent="center">
        <Box w="50%" py={4}>
          <Text textAlign="center">Transactions page</Text>
          <Box display="flex" justifyContent="space-between">
            <Button alignItems="center">
              <CiFilter />
              Add Filter
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
                  <Th w={23} textTransform="capitalize">Date</Th>
                  <Th textTransform="capitalize">To/From</Th> {/* Fixed typo in "To / From" */}
                  <Th isNumeric textTransform="capitalize">Amount</Th>
                  <Th textTransform="capitalize">Payment Method</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>10 OCT</Td>
                  <Td>Transfer to ops/payroll</Td>{" "}
                  {/* Fixed typo in "millimeters" */}
                  <Td isNumeric>25.4</Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td>centimeters (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td>meters (m)</Td> {/* Fixed typo in "meters" */}
                  <Td isNumeric>0.91444</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default Page; // Changed "page" to "Page" for naming consistency
