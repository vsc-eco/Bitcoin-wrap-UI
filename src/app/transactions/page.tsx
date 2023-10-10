"use client";
import React from "react";
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
import {HiDownload} from "react-icons/hi"

type Props = {};

const page = (props: Props) => {
  return (
    <Flex justifyContent="center">
    <Box w="50%">
      <Text textAlign="center">Transactions page</Text>
      {/* There will be two buttons here  */}
      <Box display="flex" justifyContent="space-between">
        <Button>
            Add Filter
        </Button>
        <Button>
            Export
        </Button>

      </Box>
      <TableContainer alignSelf='center'>
        <Table variant="simple" size="sm">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
    </Flex>
  );
};

export default page;
