import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import Dashboard from "./Dashboard";
import AccountComponent from "./AccountComponent";
import { useAuth } from "../../hooks/auth";
import { readableUsername } from "../Sidebar/UserInfo";
import styles from "./Home.module.css"

type Props = {};

const Home = (props: Props) => {
  const auth = useAuth();

  const userId = auth.authenticated ? auth.userId : "";
  const username = readableUsername(userId);

  return (
    <Box w="auto" h="full" justifyContent={"center"} py={12} className={styles.parent_container}>
      <Flex>
        <Dashboard username={username} />
        <AccountComponent username={username} />
      </Flex>
    </Box>
  );
};

export default Home;
