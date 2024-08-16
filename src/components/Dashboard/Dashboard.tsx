//TODO:
import React from "react";
import { Flex, Text, Card, Box, CardHeader } from "@chakra-ui/react";
import AccountComponent from "../AccountComponent";
import { FaChartLine } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import ChartComponent from "./ChartComponent";
import { IoChevronDownOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";

type Props = {
  username: string;
};

const Dashboard = ({ username }: Props) => {
  //function for making the font smaller after dots
  // const priceElement = document.getElementById("price");

  //Get the text and split at the decimal point
  // const [dollars, cents] = (priceElement?.textContent || "").split(".");
  //  const centElement = document.createElement('span');
  //  centElement.textContent = cents;
  //  centElement.style.fontSize = 'xs'
  //  priceElement!.textContent = dollars + '.';
  //  priceElement?.appendChild(centElement);

  return (
    <Flex direction="column" justifyContent={"center"} color={"#75757d"}>
      <Box pl={4}>
        <Text fontSize="xl">Welcome, {username}</Text>
      </Box>
      <Flex mt={4} w="100%">
        <Card
          bg="white"
          maxW="800px"
          h="400px"
          w={"max-content"}
          m={["0", "0", "1", "3"]}
        >
          <CardHeader>
            <Text fontSize={"sm"}>Hive balance</Text>
            <Flex justifyContent={"space-between"}>
              <Flex>
                <Text id="price" fontSize={"xl"} fontWeight={"bold"}>
                  {"$110"}.<span style={{ fontSize: "0.6em" }}>{"22"}</span>
                </Text>
              </Flex>
              <Flex>
                <Flex
                  mx={2}
                  my={1}
                  p={1}
                  fontSize={"l"}
                  boxShadow="2px 2px rgba(0, 0, 0, 0.2)"
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
                  boxShadow="2px 2px rgba(0, 0, 0, 0.2)"
                  borderRadius={"md"}
                  cursor={"pointer"}
                >
                  <FaCalendarDays />
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex>
                <Flex color={"grey.700"} alignItems={"center"}>
                  <Text fontSize="xs">Last 30 days</Text>
                  <IoChevronDownOutline />
                </Flex>
              </Flex>
              <Flex fontSize={"sm"} alignItems={"center"}>
                <Flex fontSize={"lg"} color={"green.700"}>
                  <GoArrowUpRight />
                </Flex>
                <Flex>
                  <Text pr={2}>$72,966</Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <ChartComponent />
        </Card>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
