"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";
import LandingPage from "../sections/LandingPage";
import { useDisclosure } from "@chakra-ui/react";
import SecondSection from "../sections/SecondSection";

//importing context
import { ShowComponentProvider } from "../context/ShowComponent";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <ShowComponentProvider>
        <Box w="100%">
          <LandingPage />
          <SecondSection />
        </Box>
      </ShowComponentProvider>
    </>
  );
};

export default Page;
