//TODO: make a common card here and integrate all the components inside it

"use client";
import React, { useLayoutEffect, useReducer, useState } from "react";
import { Card, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Transaction from "../transactions/Transaction";
import ThirdSection from "./ThirdSection";
import { useAccountContext } from "../context/AccountContext";
import Dashboard from "../components/Dashboard/Dashboard";
import DexComponent from "../components/DexComponent";
import SignUpComponent from "../components/Login/SignUpComponent";
import { ResolveUsername } from "../hooks/Hive";
import { AlertComponent } from "../components/Alerts/AlertComponent";
import Home from "../components/Dashboard/Home";

type Props = {};

const initialState = {
  render: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RENDER":
      return {
        ...state,
        render: action.payload,
      };
    default:
      return state;
  }
};

const SecondSection = (props: Props) => {
  const { myDid } = useAccountContext();
  const [isClient, setClient] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTransactionOnClick = () => {
    dispatch({ type: "SET_RENDER", payload: "transaction" });
  };

  const handleExchangeOnClick = () => {
    dispatch({ type: "SET_RENDER", payload: "exchange" });
  };

  const handleTradeComponent = () => {
    dispatch({ type: "SET_RENDER", payload: "trade" });
  };

  const handleDexComponent = () => {
    dispatch({ type: "SET_RENDER", payload: "dex" });
  };

  const handleSignUpComponent = () => {
    dispatch({ type: "SET_RENDER", payload: "signup" });
    console.log(":hey");
  };

  useLayoutEffect(() => {
    setClient(true);
    return () => {
      setClient(false);
    };
  }, []);

  return (
    <>
      <Flex w="full" h={"full"}>
        <Flex w="12%">
          <Sidebar
            handleExchangeOnClick={handleExchangeOnClick}
            handleTransactionOnClick={handleTransactionOnClick}
            handleDexComponent={handleDexComponent}
            handleTradeComponent={handleTradeComponent}
            handleSignUpComponent={handleSignUpComponent}
            resolveUsername={ResolveUsername("vaultec")}
          />
        </Flex>
        <Flex className="parent" w="full" h="100vh" justifyContent={"center"}>
          {isClient && window.location.hostname !== "wrap.vsc.eco" ? (
            <Flex className="child" id="transaction-swap" m={0} p={0}  maxW={"900px"} my={8}>
              <Card>
              {state.render === "signup" ? (
                !myDid ? (
                  <SignUpComponent />
                ) : (
                  <AlertComponent>You are already logged in!</AlertComponent>
                )
              ) : null}
              {/* showing it default  */}
              {myDid && (state.render === "" || state.render === "trade") && (
                <Home />
              )}
              {myDid && state.render === "exchange" && <ThirdSection />}
              {myDid && state.render === "dex" && <DexComponent />}
              {myDid && state.render === "transaction" && <Transaction />}
              </Card>
            </Flex>
          ) : (
            <Flex
              h={720}
              w={720}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text fontSize={"2xl"}>Coming soon in production!</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default SecondSection;
