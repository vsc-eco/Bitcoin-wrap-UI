import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AccountComponent = (props: Props) => {
  let username;
  if(typeof window !== "undefined"){
      username = JSON.parse(window!.localStorage.getItem("login.auth")!)[
      "authId"
    ].split(":")[1];
  }



  return (  
    <Flex>
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

        <CardBody>
          <Text>{username}</Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default AccountComponent;
