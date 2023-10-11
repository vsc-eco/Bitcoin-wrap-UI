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
  WrapItem,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { HiDownload } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { BsCoin } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

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
                  <Th w={23} textTransform="capitalize">
                    Date
                  </Th>
                  <Th textTransform="capitalize">To/From</Th>{" "}
                  {/* Fixed typo in "To / From" */}
                  <Th isNumeric textTransform="capitalize">
                    Amount
                  </Th>
                  <Th
                    textTransform="capitalize"
                    display="flex"
                    alignItems="center"
                  >
                    <BsCoin />
                    <Text px={1}>Payment Method</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>10 Oct</Td>
                  <Td display="flex" alignItems="center">
                    <WrapItem>
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </WrapItem>
                    <Text px={2}>Transfer to ops/payroll</Text>
                  </Td>
                  <Td isNumeric>25.4</Td>
                  <Td display="flex" alignItems="center">
                    <BsArrowLeft />
                    <Text>Transfer</Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td display="flex" alignItems="center">
                    <WrapItem>
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </WrapItem>
                    <Text px={2}>Transfer to ops/payroll</Text>
                  </Td>
                  <Td isNumeric>30.48</Td>
                  <Td display="flex" alignItems="center">
                    <Text>Transfer</Text>
                    <BsArrowRight />
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td display="flex" alignItems="center">
                    <WrapItem>
                      <Avatar
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </WrapItem>
                    <Text px={2}>Transfer to ops/payroll</Text>
                  </Td>
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
