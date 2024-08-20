//TODO: add a functionality here to hover the component and show the copy to clopboard button 

import { Card, Flex, Text, Icon, Box, Button } from "@chakra-ui/react";
import React from "react";
import styles from "./Account.module.css";
import { BiTransferAlt } from "react-icons/bi";
import AccountData from "./AccountData";
import Image from "next/image";
import { accountData } from "../../types/types";


type Props = {
  username: string;
};


const AccountsData = [
    {
      id: 1,
      name: "Hive",
      price: "1209",
      decimalValue: "23",
      image: "./hive.svg"
    },
    {
      id: 2,
      name: "HBD",
      price: "3121",
      decimalValue: "23",
      image: "hbd_green.svg"
    },
  ];


const AccountComponent = ({ username }: Props) => {
  return (
    <Flex alignItems={"center"} mt={10}>
      <Card
        bg="white"
        mx={["0", "0", "1", "3"]}
        alignItems={"center"}
        className={styles.parent_container}
        height={470}
      >
        <Flex className={styles.heading}>
          <Text fontWeight="bolder">Accounts</Text>
          <Button colorScheme={"gray"}>
          <Icon as={BiTransferAlt} className={styles.icon} />
          </Button>
        </Flex>
        <Box className={styles.account_data}>
         {AccountsData.map((item: accountData) => (
            <AccountData 
             key={item.id}
             item={item}
            />
           ))}
          </Box>
      </Card>
    </Flex>
  );
};

export default AccountComponent;
