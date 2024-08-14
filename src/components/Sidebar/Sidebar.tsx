
import React, { useState } from "react";
import { Box, VStack, Text, Flex, Button } from "@chakra-ui/react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { CiMenuBurger } from "react-icons/ci";
import { BsCoin } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import {
  AccountContext,
  useAccountContext,
} from "../../context/AccountContext";
import { useContext } from "react";
import { ResolveUsername } from "../../hooks/Hive";
import { BiSolidLogInCircle } from "react-icons/bi";
import LogoComponent from "../Logo/LogoComponent";

const Sidebar = ({
  handleExchangeOnClick,
  handleTransactionOnClick,
  handleDexComponent,
  handleTradeComponent,
  handleSignUpComponent,
  resolveUsername,
}) => {
  const { triggerLoginWithHive, myDid } = useAccountContext();

  const did = resolveUsername;

  const menuItems = [
    {
      icon: <GoHome />,
      text: "Home",
      onClick: handleTradeComponent,
    } as const,
    {
      icon: <LiaExchangeAltSolid />,
      text: "Wrap",
      onClick: handleExchangeOnClick,
    } as const,
    {
      icon: <BsCoin />,
      text: "Dex",
      onClick: handleDexComponent,
    } as const,
    {
      icon: <CiMenuBurger />,
      text: "Transactions",
      onClick: handleTransactionOnClick,
    } as const,
  ] as const;

  //initialized a useState and then we can have 
  const [selectItems, setSelectedItem] = useState<typeof menuItems[number]['text']>("Home");

  return (
    <Flex
      flexDirection={"column"}
      gap={5}
      boxShadow="base"
      paddingY="10px"
      paddingX={"20px"}
      position="relative"
    >
      <LogoComponent />
      <VStack align="start" w="auto">
        {menuItems.map((item) => (
          <Flex
            key={item.text}
            alignItems="center"
            justifyContent={"center"}
            onClick={item.onClick}
          >
            <Flex
              alignItems={"center"}
              gap={1}
              w={36}
              _hover={{ bgColor: "#f3f4f7"}}
              paddingX={2}
              paddingY={1}
              borderRadius={"sm"}
              color={selectItems === item.text ? "black" : "#75757d"}
              fontWeight={selectItems === item.text ? 480 : undefined}
              bgColor={selectItems === item.text ? "#f3f4f7" : "white"}
              cursor={"pointer"}
              onClick={() =>  setSelectedItem(item.text)}
            >
              <Text color={selectItems === item.text ? "#7b8aee" : "#75757d"}>{item.icon}</Text>
              <Text ml={1} fontSize="xs" cursor={"pointer"}>
                {item.text}
              </Text>
            </Flex>
          </Flex>
        ))}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginX="10px"
          position={"absolute"}
          bottom={"12px"}
          width={"100%"}
        >
          <Flex
            alignItems="center"
            _hover={{bgColor: "#f3f4f7" , color: "black"}}
            w={36}
            px={2}
            py={1}
          >
            <BiSolidLogInCircle size={"18px"} color={"#75757d"} />
            <Text
              ml={1}
              fontSize="xs"
              fontWeight="regular"
              onClick={handleSignUpComponent}
              cursor={"pointer"}
              color={"#75757d"}
              _hover={{color: "black"}}
            >
              Sign in
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Sidebar;
