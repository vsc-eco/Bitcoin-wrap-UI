import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Sidebar from "../components/Sidebar";


type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
    
    <Flex
      direction={["column", "column", "column", "row"]} // Responsive flex direction
      bgColor="linear(to-l, #919ca9, #fefeff)"
      alignItems="center"
    >
      <Flex
        h="100vh"
        w="full"
        justifyContent="center"
        alignItems="center"
        flex={1} // Flex to occupy available space
      >
        <Box py={"4"} textAlign="center">
          <Text fontSize={["2rem", "3rem", "4rem", "5rem"]} fontWeight="bolder">
            HIVE Finance: smooth DeFi experience
          </Text>
        </Box>
      </Flex>
      <Flex
        display={["block", "block", "block", "block"]} // Hide on mobile views
      >
        <Image src="/Landing.svg" alt="Landing" width={800} height={800} />
      </Flex>
    </Flex>
    </>
  );
}


export default LandingPage;