import React from "react";
import { TokenAmountProvider } from "../../context/TokenTransferContext";
import SecondSection from "../../sections/SecondSection";

type Props = {};

const page = (props: Props) => {
  return (
    <TokenAmountProvider>
      <SecondSection />
    </TokenAmountProvider>
  );
};

export default page;
