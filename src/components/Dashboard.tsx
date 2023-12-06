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

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Flex direction="column" mt={32}>
      <Flex>
        <Text fontSize="xl">Welcome, User</Text>
      </Flex>

      <Flex mt={4} w="100%">
        <Card
          bg="white"
          maxW="800px"
          h="55vh"
          maxH={"60vh"}
          w={["400px", "300px", "580px", "600px"]}
          m={["0", "0", "1", "3"]}
        >
          <CardHeader>
            <Text>
              Hive balance
              {/* TODO: to fit the check icon here  */}
            </Text>
            <Flex justifyContent={"space-between"}>
              <Flex>
                <Text fontWeight={"bolder"} fontSize={"larger"}>
                  $5, 20001
                </Text>
              </Flex>
              <Flex >
                <Flex px={2} fontSize={"xl"}>
                  <FaChartLine />
                </Flex>
                <Flex px={2} fontSize={"xl"}>
                  <FaCalendarDays />
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <ChartComponent />
          </CardBody>
          {/* <CardFooter>
            <Flex w={"full"} justifyContent="space-evenly">
              <Text>Nov 9</Text>
              <Text>Nov 10</Text>
              <Text>Nov 11</Text>
              <Text>Nov 12</Text>
            </Flex>
          </CardFooter> */}
        </Card>
        {/* This is the another component  */}
        <AccountComponent />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
