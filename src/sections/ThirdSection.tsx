import { Box, Flex, Icon, Button } from "@chakra-ui/react";
import React from "react";
import DepositModal from "../components/DepositModal";
//importing the context file
import { useShowComponent } from "../context/ShowComponent";

import { IoReturnUpBack } from "react-icons/io5";



type Props = {};

const ThirdSection = (props: Props) => {

 const {showComponent} = useShowComponent();

 const {toggleShowComponent} = useShowComponent();

 if(!showComponent) {
  return null;  //dont render the component if the state is false
 }

  return (
    <>
    <Flex justifyContent="center">
      <DepositModal />
    </Flex>
    <Flex justifyContent={"center"} m={2}>
      <Button>
      <Icon 
       as={IoReturnUpBack}
       onClick={toggleShowComponent}
       cursor={"pointer"}
       boxSize={"2rem"}
       />
      </Button>
       </Flex>
      </>
  );
};

export default ThirdSection;