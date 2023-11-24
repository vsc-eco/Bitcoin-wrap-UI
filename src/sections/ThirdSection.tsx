import { Box, Flex, Icon, Button } from "@chakra-ui/react";
import React from "react";
import DepositModal from "../components/DepositModal";
import ExchangeModal from "../components/ExchangeModal";
//importing the context file
import { useShowComponent } from "../context/ShowComponent";

import { MdOutlineKeyboardBackspace } from "react-icons/md";


type Props = {};

const ThirdSection = (props: Props) => {
  const { showComponent } = useShowComponent();

  const { toggleShowComponent } = useShowComponent();

  if (!showComponent) {
    return <ExchangeModal />;
  } else {
    return (
      <>
        <Flex justifyContent="center" >
        <Button marginTop={"7rem"}>
            <Icon
              as={MdOutlineKeyboardBackspace }
              onClick={toggleShowComponent}
              cursor={"pointer"}
              boxSize={"2rem"}
            />
          </Button>
          <DepositModal />
        </Flex>
      </>
    );
  }
};

export default ThirdSection;
