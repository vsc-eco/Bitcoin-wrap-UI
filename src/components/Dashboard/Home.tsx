import { Flex } from "@chakra-ui/react";
import React from "react";
import Dashboard from "./Dashboard";
import AccountComponent from "../AccountComponent";

type Props = {};

const Home = (props: Props) => {

    const response = JSON.parse(localStorage.getItem("login.auth")!)[
        "authId"
      ].split(":")[1];

  return (
    <Flex w="auto" h="full" justifyContent={"center"} py={12}>
      <Flex>
        <Dashboard username={response}/>
      </Flex>
      <Flex>
        <AccountComponent username={response} />
      </Flex>
    </Flex>
  );
};

export default Home;
