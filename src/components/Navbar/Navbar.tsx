"use client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Image from "next/image";
import {RiArrowDropDownLine} from "react-icons/ri"
import LogoComponent from "../Logo/LogoComponent";
const Navbar = () => {
  const size = useBreakpointValue({ base: "xs", md: "md" });
  return (
    <Flex
      bg="teal.500"
      py={5}
      justifyContent="space-between"
      alignItems="center"
      bgGradient="linear(to-l, #919ca9, #fefeff)"
    >
      <Flex flexDirection="row"  alignItems="center">
        <Flex alignItems="center">
          <Box w={["12","16","20","24"]}>
            <LogoComponent />
          </Box>
          <Text letterSpacing="0.1rem" fontWeight="bolder" fontSize={["12px", "16px", "20px", "24px"]}>VSC NETWORK</Text>
        </Flex>
      </Flex>
      <Flex mx={["1","2","3","4"]}>
        <Link mx={4} fontWeight="bold" href="https://vsc.eco" target="_blank">
          <Flex alignItems="center">
          <Text fontSize={["10px", "10px", "12px", "16px"]}>Main site</Text>
          <RiArrowDropDownLine />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
