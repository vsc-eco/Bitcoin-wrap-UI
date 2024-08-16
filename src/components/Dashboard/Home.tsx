import { Flex } from "@chakra-ui/react";
import React from "react";
import Dashboard from "./Dashboard";
import AccountComponent from "../AccountComponent";
import { useAuth } from "../../hooks/auth";
import { readableUsername } from "../Sidebar/UserInfo";

type Props = {};

const Home = (props: Props) => {
  const auth = useAuth();

  const userId = auth.authenticated ? auth.userId : "";
  const username = readableUsername(userId);

  return (
    <Flex w="auto" h="full" justifyContent={"center"} py={12}>
      <Flex>
        <Dashboard username={userId} />
      </Flex>
      <Flex>
        <AccountComponent username={username} />
      </Flex>
    </Flex>
  );
};

export default Home;
