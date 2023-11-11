"use client"
import React from "react";
import Navbar from "../components/Navbar";
import { Box} from "@chakra-ui/react";
import LandingPage from "../sections/LandingPage";
import { useDisclosure } from '@chakra-ui/react';
import SecondSection from "../sections/SecondSection";
import ThirdSection from "../sections/ThirdSection";

import { AccountContext } from "../context/AccountContext";


type Props = {};

const Page = (props: Props) => {


  return (
    <>
      <Box w="100%">
          <LandingPage />
          <SecondSection />
          <ThirdSection />
      </Box>
    </>
  );
};

export default Page;
