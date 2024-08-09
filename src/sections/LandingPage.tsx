import React, { SetStateAction } from "react";
import { Box, Text, Flex, Button, Icon } from "@chakra-ui/react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";

//TODO: Hive Finance smooth Defi have to bit little bit shorter
type Props = {
  setShow: React.Dispatch<SetStateAction<Boolean>>;
};

const LandingPage = ({ setShow}: Props) => {
  return (
    <>
      <Navbar />
      <Flex
        direction={["column", "column", "column", "row"]} // Responsive flex direction
        alignItems="center"
        bgGradient="linear(to-l, #919ca9, #fefeff)"
      >
        <Flex
          h="90vh"
          w="full"
          justifyContent="center"
          alignItems="center"
          flexDirection={"row"}
        >
          <Box pb={64} textAlign="center" p={12}>
            <Text
              fontSize={["2rem", "3rem", "4rem", "6rem"]}
              fontWeight="bolder"
            >
              HIVE Finance: smooth DeFi experience
            </Text>
            <Box>
              <Link href={"/secondSection"}>
                <Button colorScheme="blue" onClick={() => setShow(true)}>
                  Launch
                  <Icon paddingLeft={1} as={ArrowForwardIcon} boxSize={"1m"} />
                </Button>
              </Link>
            </Box>
          </Box>
        </Flex>
        <Flex
          display={["block", "block", "block", "block"]} // Hide on mobile views
        >
          <Image src="/Landing.svg" alt="Landing" width={800} height={800} />
        </Flex>
      </Flex>
    </>
  );
};

export default LandingPage;
