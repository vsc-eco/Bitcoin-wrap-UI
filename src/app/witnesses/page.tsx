
"use client";
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { IoIosLink } from "react-icons/io";
import { BsCircle } from "react-icons/bs";

//exporting the mockup data
import blockProducers from "./BlockProducersData";
import { CgEditBlackPoint } from "react-icons/cg";

export default function Component() {
  return (
    <Flex justifyContent={"center"}>
      <Box bg="white" p={6} rounded="lg" shadow="md" w={"70%"}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={4}>
              VSC Witnesses (aka Block Producers)
            </Heading>
            <List fontSize="sm" listStyleType="disc" pl={5} mb={4}>
              <ListItem>
                VSC Witnesses operate consensus servers (nodes) and ensure the
                correct behavior of the blockchain.
              </ListItem>
              <ListItem>
                They also make consensus decisions for the future development of
                VSC.
              </ListItem>
              <ListItem>
                Each account can vote for 30 witnesses, and the vote is
                proportional to the amount of Staked HBD controlled by the
                account.
              </ListItem>
            </List>
          </Box>
          <Flex display="flex" justifyContent="end" mb={4}>
            {/* <Button bg="#3498db" color="white" variant="solid" mx={2}>
                GENERAL
              </Button> */}
            {/* <Button bg="#3498db" color="white" variant="solid" mx={2}>
                PARAMS
              </Button> */}
          </Flex>
        </Flex>
        <Box overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th w={24}>Rank (Active)</Th>
                <Th minW={500}>Witness</Th>
                <Th w={24}>Version</Th>
                <Th w={24}>Votes (MHP)</Th>
                <Th w={24}>Last Block</Th>
                <Th w={24}>Vote</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blockProducers.map((items, id) => (
                <Tr key={id}>
                  <Td textAlign={"center"}>{items.rank}</Td>
                  <Td>
                    <Flex>
                      <Box borderRadius="full" overflow={"hidden"} pt={1}>
                        <Image
                          alt={"dp"}
                          src={items.imageLink}
                          height={32}
                          width={32}
                        />
                      </Box>
                      <Flex>
                        <Box px={2}>
                          <Flex>
                            <Text pr={2}>{items.userName}</Text>
                            <Text>
                              <IoIosLink />
                            </Text>
                          </Flex>
                          <Text fontSize={"sm"}>{items.userDescription}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex alignItems={"center"}>
                      <Text fontSize={"xs"} pr={2}>
                        <CgEditBlackPoint color="green" />
                      </Text>
                      <Box w={12} background={"gray.300"} borderRadius={"sm"}>
                        <Text fontSize={"xs"} textAlign={"center"}>
                          {items.version}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td color={"blue.400"}>{items.votes}m</Td>
                  <Td>
                    {items.lastBlock}
                    <Text fontSize={"xs"} textColor={"gray.600"}>
                      a minute ago
                    </Text>
                  </Td>
                  <Td>
                    <Flex
                      background={"gray.100"}
                      w={8}
                      h={8}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"lg"}
                    >
                      {items.vote ? (
                        <Icon as={CheckIcon} color="green.500" />
                      ) : (
                        <Icon as={CloseIcon} color="red.500" />
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
}
