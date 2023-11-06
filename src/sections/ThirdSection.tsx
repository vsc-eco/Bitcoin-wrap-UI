import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import DepositModal from "../components/DepositModal";

type Props = {};

const ThirdSection = (props: Props) => {
  return (
    <Flex justifyContent="center">
      <DepositModal />
    </Flex>
  );
};

export default ThirdSection;
