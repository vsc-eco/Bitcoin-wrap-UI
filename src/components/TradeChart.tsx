import React from "react";
import { Flex, Text, Card } from "@chakra-ui/react";

type Props = {};

const TradeChart = (props: Props) => {
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
          alignItems={"center"}
        >
          <Text fontWeight="bolder">This is the Trade component</Text>
        </Card>

        <Card
          bg="white"
          maxW="800px"
          h="55vh"
          maxH={"60vh"}
          w={["400px", "300px", "580px", "600px"]}
          m={["0", "0", "1", "3"]}
          alignItems={"center"}
        >
          <Flex>
            <Text fontWeight="bolder">Accounts</Text>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default TradeChart;
