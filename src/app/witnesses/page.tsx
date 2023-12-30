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

//exporting the mockup data
import blockProducers from "./BlockProducersData";
import { buildExecutionContext } from "graphql/execution/execute";

export default function Component() {
  return (
    <Flex justifyContent={"center"}>
      <Box bg="white" p={6} rounded="lg" shadow="md" w={"70%"}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={4}>
              Hive Witnesses (aka Block Producers)
            </Heading>
            <List fontSize="sm" listStyleType="disc" pl={5} mb={4}>
              <ListItem>
                Hive Witnesses operate consensus servers (nodes) and ensure the
                correct behavior of the blockchain.
              </ListItem>
              <ListItem>
                They also make consensus decisions for the future development of
                Hive.
              </ListItem>
              <ListItem>
                Each account can vote for 30 witnesses, and the vote is
                proportional to the amount of Hive Power controlled by the
                account.
              </ListItem>
            </List>
          </Box>
          <Flex display="flex" justifyContent="end" mb={4}>
            <Button bg="#3498db" color="white" variant="solid" mx={2}>
              GENERAL
            </Button>
            <Button bg="#3498db" color="white" variant="solid" mx={2}>
              PARAMS
            </Button>
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
                      <Image
                        alt={""}
                        src={items.imageLink}
                        height={50}
                        width={50}
                      />
                      <Flex>
                        <Box>
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
                    <Box w={12} background={"gray.400"} borderRadius={"sm"}>
                      <Text fontSize={"xs"} textAlign={"center"}>
                        {items.version}
                      </Text>
                    </Box>
                  </Td>
                  <Td>{items.votes}m</Td>
                  <Td>{items.lastBlock} 
                  <Text fontSize={"xs"}>a minute ago</Text>
                  </Td>
                  <Td>
                    <Flex background={"gray.100"} w={8} h={8} justifyContent={"center"} alignItems={"center"} borderRadius={"lg"}>
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
