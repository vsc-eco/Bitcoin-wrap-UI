import React from "react";
import {
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import AccountComponent from "./AccountComponent";
import { FaChartLine } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import ChartComponent from "./ChartComponent";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

type Props = {};

const Dashboard = (props: Props) => {
  const response = JSON.parse(localStorage.getItem("login.auth")!)[
    "authId"
  ].split(":")[1];

    return (
      <Flex direction="column" mt={32}>
        <Flex>
          <Text fontSize="xl">Welcome, {response}</Text>
        </Flex>

        <Flex mt={4} w="100%">
          <Card
            bg="white"
            maxW="800px"
            h="55vh"
            maxH={"60vh"}
            w={["400px", "300px", "580px", "600px"]}
            m={["0", "0", "1", "3"]}
            p={0}
          >
            <CardHeader>
              <Text>Hive balance</Text>
              <Flex justifyContent={"space-between"}>
                <Flex>
                  <Text fontWeight={"bolder"} fontSize={"larger"}>
                    $5, 20001
                  </Text>
                </Flex>
                <Flex>
                  <Flex
                    mx={2}
                    my={1}
                    p={1}
                    fontSize={"l"}
                    boxShadow="2px 2px rgba(0, 0, 0, 0.2)"
                    borderRadius={"sm"}
                    cursor={"pointer"}
                  >
                    <FaChartLine />
                  </Flex>
                  <Flex
                    mx={2}
                    my={1}
                    p={1}
                    fontSize={"l"}
                    boxShadow="2px 2px rgba(0, 0, 0, 0.2)"
                    borderRadius={"sm"}
                    cursor={"pointer"}
                  >
                    <FaCalendarDays />
                  </Flex>
                </Flex>
              </Flex>
              <Flex justifyContent="space-between">
                <Flex>
                  <Flex mx={1} color={"grey.700"}>
                    <Text fontSize="xs">Last 30 days</Text>
                    <Text fontSize="s">
                      <IoChevronDownOutline />
                    </Text>
                  </Flex>
                </Flex>
                <Flex fontSize={"l"}>
                  <Flex color={"green.700"}>
                    <MdArrowOutward />
                  </Flex>
                  <Flex>
                    <Text fontSize={"sm"} pr={2}>
                      $72,966
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </CardHeader>
            <ChartComponent />
          </Card>
          <AccountComponent />
        </Flex>
      </Flex>
    );
};

export default Dashboard;
