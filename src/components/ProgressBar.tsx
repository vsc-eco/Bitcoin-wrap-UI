import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import { IoReloadCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import { RiSendPlaneLine } from "react-icons/ri";

interface Step {
  name: string;
  icon: React.ReactNode;
}

//TODO: make the line less visible

const steps = [
  { name: "Pending deposit", icon: <MdPending /> },
  { name: "Confirming", icon: <IoReloadCircleSharp /> },
  { name: "Minting", icon: <TbExchange /> },
  { name: "Complete", icon: <RiSendPlaneLine /> },
];

const ProgressBar = ({ currentStep = 0 }) => {
  return (
    <>
    <Box display="flex" justifyContent="space-evenly" alignItems="end" position="relative" >
      {steps.map((step, i) => (
        <> 
        <Box key={i} w={24}>
          <Box
            position={"relative"}
            display="flex"
            justifyContent="center"
            background={"white"}
            fontSize="xl"
            color={i <= currentStep ? "green.600" : "gray.700"}
            zIndex={2}
          >
            {/* {i <= currentStep ? step.icon : null} */}
            {step.icon}
          </Box>
          <Box fontWeight={i == currentStep ? "bold" : "none"} textAlign={"center"}>{step.name}</Box>
        </Box>
        {i <steps.length - 1 && <Divider orientation="horizontal" borderColor="gray.200" position={"absolute"} right={24} top={2.5} w={96} />}
        </>
      ))}
    </Box>
   
    </>
  );
};

export default ProgressBar;
