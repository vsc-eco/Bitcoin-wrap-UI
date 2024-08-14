import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  username: string;
};

const AccountComponent = ({ username }: Props) => {
  return (
    <Flex alignItems={"center"} mt={10}>
      <Card
        bg="white"
        height={"400px"}
        width={"400px"}
        mx={["0", "0", "1", "3"]}
        alignItems={"center"}
      >
        <Flex>
          <Text fontWeight="bolder">Accounts</Text>
        </Flex>

        <CardBody>
          <Text>{username}</Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default AccountComponent;
