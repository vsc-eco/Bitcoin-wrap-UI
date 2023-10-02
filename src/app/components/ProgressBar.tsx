import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import { IoReloadCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import { RiSendPlaneLine } from "react-icons/ri";

const steps = [
  { name: "Pending deposit", icon: <MdPending /> },
  { name: "Confirming", icon: <IoReloadCircleSharp /> },
  { name: "Minting", icon: <TbExchange /> },
  { name: "Sending", icon: <RiSendPlaneLine /> },
];

const ProgressBar = ({ currentStep = 0 }) => {
  return (
    <>
    <Box display="flex" justifyContent="space-evenly" alignItems="end" position="relative" >
      {steps.map((step, i) => (
        <Box key={i} zIndex={2}>
          <Box
            display="flex"
            justifyContent="center"
            fontSize="xl"
            color={i <= currentStep ? "blue.900" : "gray.700"}
            background="#ebf4f5"
          >
            {/* {i <= currentStep ? step.icon : null} */}
            {step.icon}
          </Box>
          
          <Box fontWeight={i <= currentStep ? "bold" : "none"}>{step.name}</Box>
        </Box>
      ))}
      <Box
     as="hr"
     w="70%"
     h={1}
     position="absolute"
     right="60px"
     top="9px"
     zIndex={1}
    />
    </Box>
   
    </>
  );
};

export default ProgressBar;
