
"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import LandingPage from "../sections/LandingPage";
import { useDisclosure } from "@chakra-ui/react";
import SecondSection from "../sections/SecondSection";
import ThirdSection from "../sections/ThirdSection";
import { TokenAmountProvider } from "../context/TokenTransferContext";

type Props = {};

const Page = (props: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(show);
  });
  return (
    <>
      <TokenAmountProvider>
        <Box w="100%">
          {show ? <LandingPage setShow={setShow} /> : <SecondSection />}
        </Box>
      </TokenAmountProvider>
    </>
  );
};

export default Page;
