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
  { name: "Complete", icon: <RiSendPlaneLine /> },
];

//TODO : have to make a line between them and bold letter should come to the processing  
const ProgressBar = ({ currentStep = 0 }) => {
  return (
    <Box display="flex" justifyContent="space-evenly" alignItems="end">
      {steps.map((step, i) => (
        <Box key={i}>
          <Box
            display="flex"
            justifyContent="center"
            fontSize="xl"
            color={i <= currentStep ? "green.600" : "gray.700"}
          >
            {/* {i <= currentStep ? step.icon : null} */}
            {step.icon}
          </Box>
          <Box fontWeight={i <= currentStep ? "bold" : "none"}>{step.name}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProgressBar;
