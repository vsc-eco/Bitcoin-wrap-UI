import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { AccountContext, useAccountContext } from "../context/AccountContext";
import { useContext } from "react";

type Props = {};

const LoginComponent = (props: Props) => {
  const { triggerLoginWithHive } = useAccountContext();

  return (
    <Flex w={720} h={720} justifyContent="center" alignItems="center">
      <Flex mx={2}>
        <Text fontSize="larger" fontWeight="bolder">
          Login to your Hive account! 
        </Text>
      </Flex>
      <Flex 
        bgColor="#1c1b1b"
        _hover={{ bgColor: "black" }}
        p={2}
        borderRadius={3}
        onClick={triggerLoginWithHive}
      >
        <Image
          src="/keychain.png"
          height={112}
          width={115}
          alt="keychain logo"
          style={{ cursor: "pointer" }}
        />
      </Flex>
    </Flex>
  );
};

export default LoginComponent;
