import React from "react";
import ExchangeModal from "../components/ExchangeModal";
import DepositModal from "../components/DepositModal";
import Navbar from "../components/Navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import LandingPage from "../components/LandingPage";
import Hamburger from "../components/Hamburger";
import Sidebar from "../components/Sidebar";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Box as="section">
        <Navbar />
        <Box>
          <Hamburger />
          {/* <Sidebar /> */}
          <LandingPage />
          <ExchangeModal />
          <DepositModal />
        </Box>
      </Box>
    </>
  );
};

export default Page;
