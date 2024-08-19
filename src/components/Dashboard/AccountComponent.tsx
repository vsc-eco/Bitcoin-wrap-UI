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
      name: "Credits",
      price: "12000",
      decimalValue: "23",
    },
    {
      id: 2,
      name: "Pleasure",
      price: "13090",
      decimalValue: "23",
    },
    {
      id: 3,
      name: "Ops / Payroll",
      price: "13097",
      decimalValue: "13",
    },
    {
      id: 4,
      name: "AP",
      price: "12000",
      decimalValue: "23",
    },
    {
      id: 5,
      name: "AR",
      price: "1000",
      decimalValue: "93",
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
