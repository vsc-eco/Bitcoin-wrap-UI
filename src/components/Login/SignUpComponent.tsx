import React, { useLayoutEffect, useState, memo } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Image,
  Text,
  Link,
  Center,
  Flex,
} from "@chakra-ui/react";
import { PiGoogleChromeLogoBold } from "react-icons/pi";
import { FaGithub, FaDiscord } from "react-icons/fa";
import {
  useAccountContext,
} from "../../context/AccountContext";
import {BUTTON_LABELS} from "../../constants"

const SignUpComponent = () => {
  const { triggerLoginWithHive } = useAccountContext();

  return (
    <Flex justifyContent="center" alignItems="center">
    <Center p={1} flexDir="column" height="60vh" width={{ base: '90%', md: '600px' }} boxShadow="lg">
      <Box mb={8}>
        <Image
          alt="Logo"
          width={{ base: '32px', md: '36px' }}
          height={{ base: '32px', md: '32px' }}
          objectFit="cover"
          src="/logo.svg"
        />
      </Box>
        <Box width="full" maxWidth="md" p={1}>
          <VStack spacing={4}>
            <Button
              leftIcon={<Image src="/hive.svg" alt="Hive logo" boxSize="6" />}
              variant="outline"
              width="full"
              onClick={triggerLoginWithHive}
            >
              {BUTTON_LABELS.signInWithHive}
            </Button>
            <Button
              leftIcon={<PiGoogleChromeLogoBold fontSize="2xl" />}
              variant="outline"
              width="full"
            >
              {BUTTON_LABELS.signUpWithGoogle}
            </Button>
            <Button
              leftIcon={<FaGithub fontSize="2xl" />}
              variant="outline"
              width="full"
            >
              {BUTTON_LABELS.signUpWithGithub}
            </Button>
            <Button
              leftIcon={<FaDiscord fontSize="2xl" />}
              variant="outline"
              width="full"
            >
              {BUTTON_LABELS.signUpWithDiscord}
            </Button>
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
};

export default SignUpComponent;
