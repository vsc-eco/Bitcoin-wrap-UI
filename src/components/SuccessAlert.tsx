import React, { useState, useEffect } from "react";
import { Box, Button, Text, CloseButton } from "@chakra-ui/react";

const LoginAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem("login.auth");
    if (isToken) {
      setShowAlert(true);
    }
  }, []);

  if (!showAlert) {
    return null;
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="green.100" position="relative">
      <CloseButton position="absolute" right="2px" top="2px" onClick={() => setShowAlert(false)} />
      <Text fontSize="l">Login Successful</Text>
      <Text>Welcome back, user!</Text>
    </Box>
  );
};

export default LoginAlert;
