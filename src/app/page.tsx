"use client";
import { Box } from "@chakra-ui/react";
import LandingPage from "../sections/LandingPage";
import SecondSection from "../sections/SecondSection";
import { RouteComponentProvider } from "../context/routeContext";

//importing context
import { ShowComponentProvider } from "../context/ShowComponent";
import { TokenAmountProvider } from "../context/TokenTransferContext";

type Props = {};


const Page = (props: Props) => {
  return (
    <>
    <RouteComponentProvider>
      <ShowComponentProvider>
        <Box w="100%">
          <LandingPage />
          <TokenAmountProvider>
            <SecondSection />
          </TokenAmountProvider>
        </Box>
      </ShowComponentProvider>
    </RouteComponentProvider>
    </>
  );
};

export default Page;
