import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import DepositModal from "../components/DepositModal";
//importing the context file
import { useShowComponent } from "../context/ShowComponent";

type Props = {};

const ThirdSection = (props: Props) => {

 const {showComponent} = useShowComponent();

 if(!showComponent) {
  return null;  //dont render the component if the state is false
 }
  return (
    <Flex justifyContent="center" >
      <DepositModal />
    </Flex>
  );
};

export default ThirdSection;
