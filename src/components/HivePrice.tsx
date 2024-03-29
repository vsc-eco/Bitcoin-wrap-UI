import React, {useState, useEffect, useLayoutEffect} from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Image from "next/image";

//importing the chart
import { AreaChart, Area, Tooltip } from "recharts";

//making a data
const data = [
  { uv: 100, pv: 2400, amt: 2100 },
  { uv: 200, pv: 1398, amt: 2210 },
  { uv: 180, pv: 1318, amt: 2110 },
  { uv: 250, pv: 1298, amt: 1910 },
  { uv: 90, pv: 1598, amt: 2410 },
];

type Props = {};

const HivePrice = (props: Props) => {

  const [InputValue, setInputValue] = useState<String | undefined>("-1.90%");
  
  //for api use

  // useLayoutEffect(()=> {
  //   const updatedValue = fetchData();
  //   setInputValue(udpatedValue)
  // }, [])

  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      my={4}
      h={16}
      borderRadius={"lg"}
      background="#f5f9fa"
    >
      <Flex justifyContent={"space-between"} px={4}>
        <Box alignItems={"center"}>
          <Text fontSize={"xl"} px={1}>
            <Image src="./hive.svg" alt="hive" width={18} height={18} />
          </Text>
          <Text>HBD</Text>
        </Box>
        <Flex w={"60%"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"sm"}>Price</Text>
            <Text fontSize={"xs"}>$1.01</Text>
          </Box>
          <Box>
            <Text fontSize={"sm"} textAlign="center">24h</Text>
            <Text fontSize={"xs"} id="1" color={InputValue?.includes("+") ? "green" : "red"}>{InputValue}</Text>
          </Box>
          <Box>
            <AreaChart width={124} height={36} data={data}>
              {/* <Tooltip /> */}
              <Area type="bump" dataKey="uv" stroke="#236ee8" fill="#80a7e8" dot={false} />
            </AreaChart>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};


export default HivePrice;
