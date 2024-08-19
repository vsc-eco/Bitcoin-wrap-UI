import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import styles from "./AccountData.module.css";
import Image from "next/image";
import { accountData } from "../../types/types";

type Props = {
  item: accountData;
};

const AccountData = ({ item }: Props) => {
  return (
    <Box className={styles.parent_container} key={item.id}>
      <Flex className={styles.mini_container}>
        <Image src={"./logo.svg"} alt={"logo"} width={50} height={50} />
        <Text>{item.name}</Text>
      </Flex>
      <Flex className={styles.price}>
        <Text>$ {item.price}</Text>
        <Flex className={styles.decimal}>
          <span className={styles.decimal2}>.</span>
          {item.decimalValue}
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountData;
