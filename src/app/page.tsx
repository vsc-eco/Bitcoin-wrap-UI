"use client"
import React from "react";
import Navbar from "../components/Navbar";
import { Box} from "@chakra-ui/react";
import LandingPage from "../sections/LandingPage";
import { useDisclosure } from '@chakra-ui/react';
import SecondSection from "../sections/SecondSection";
import ThirdSection from "../sections/ThirdSection";

type Props = {};

const Page = (props: Props) => {

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box w="100%">
        <Navbar />
          <LandingPage />
          <SecondSection />
          <ThirdSection />
      </Box>
    </>
  );
};

export default Page;
