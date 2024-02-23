
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
import { GoArrowUpRight } from "react-icons/go";
type Props = {};


const Dashboard = (props: Props) => {
  let response;
  if(typeof window !== "undefined"){
     response = JSON.parse(window!.localStorage.getItem("login.auth")!)[
      "authId"
    ].split(":")[1];
  }

  //function for making the font smaller after dots
   const priceElement = document.getElementById("price");

   //Get the text and split at the decimal point
   const [dollars, cents] = (priceElement?.textContent || "").split('.');


    return (
      <Flex direction="column" mt={32}>
        <Flex>
          <Text fontSize="xl">Welcome, {response}</Text>
        </Flex>

        <Flex mt={4} w="100%" h={"full"}>
          <Card
            bg="white"
            maxW="800px"
            h="full"
            maxH={"60vh"}
            w={["400px", "300px", "580px", "600px"]}
            m={["0", "0", "1", "3"]}
            p={0}
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
          >
            <CardHeader>
              <Text fontSize={"sm"}>Hive balance</Text>
              <Flex justifyContent={"space-between"}>
                <Flex>
                  <Text id="price"  fontSize={"32px"}>
                    {"$110"}.<span style={{ fontSize: "0.6em"}} >{"22"}</span>
                  </Text>
                </Flex>
                {/* <Flex py={4}>
                  <Flex
                    mx={2}
                    my={1}
                    p={1}
                    fontSize={"l"}
                    boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                    borderRadius={"md"}
                    cursor={"pointer"}
                  >
                    <FaChartLine />
                  </Flex>
                  <Flex
                    mx={2}
                    my={1}
                    p={1}
                    fontSize={"l"}
                    borderRadius={"md"}
                    cursor={"pointer"}
                  >
                    <FaCalendarDays />
                  </Flex>
                </Flex> */}
              </Flex>
              <Flex justifyContent="space-between">
                <Flex>
                  <Flex color={"grey.700"} alignItems={"center"}>
                    <Text fontSize="sm">Last 30 days</Text>
                    <Text fontSize="s">
                      <IoChevronDownOutline />
                    </Text>
                  </Flex>
                </Flex>
                <Flex fontSize={"sm"} alignItems={"center"}>
                  <Flex fontSize={"lg"} color={"green.700"}>
                  <GoArrowUpRight />
                  </Flex>
                  <Flex>
                    <Text pr={2}>
                      $72,966
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </CardHeader>
            <ChartComponent />
          </Card>
          {/* <AccountComponent /> */}
        </Flex>
      </Flex>
    );
};

export default Dashboard;
