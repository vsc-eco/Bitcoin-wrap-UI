//TODO: remove this header and make landing page home route
"use client";
import Navbar from "../components/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import LandingPage from "../sections/LandingPage";
import { useDisclosure } from "@chakra-ui/react";
import SecondSection from "../sections/SecondSection";
import ThirdSection from "../sections/ThirdSection";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Box w="100%">
        <LandingPage />
      </Box>
    </>
  );
};

export default Page;
