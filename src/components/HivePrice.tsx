import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Image from "next/image";

//importing the chart
import { LineChart, Line } from "recharts";
//making a data
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 200, pv: 1318, amt: 2110 },
  { name: "Page D", uv: 100, pv: 1298, amt: 1910 },
  { name: "Page E", uv: 50, pv: 1598, amt: 2410 },
];

type Props = {};

const HivePrice = (props: Props) => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      background={""}
      my={4}
      h={16}
      borderRadius={"lg"}
    >
      <Flex justifyContent={"space-between"} px={4}>
        <Box alignItems={"center"}>
          <Text fontSize={"xl"} px={1}>
            <Image src="./hive.svg" alt="hive" width={18} height={18} />
          </Text>
          <Text>HBD</Text>
        </Box>
        <Flex w={"70%"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"xs"}>Price</Text>
            <Text fontSize={"sm"}>$1.01</Text>
          </Box>
          <Box>
            <Text fontSize={"xs"}>24%</Text>
            <Text fontSize={"sm"}>$0.97</Text>
          </Box>
          <Box>
            <LineChart width={48} height={24} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#236ee8" />
            </LineChart>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HivePrice;
