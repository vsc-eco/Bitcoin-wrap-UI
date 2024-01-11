//TODO: To put sign in with ethereum 
// TODO: make it  greying which are coming soon

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
  useDisclosure,
} from "@chakra-ui/react";
import { PiGoogleChromeLogoBold } from "react-icons/pi";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { BUTTON_LABELS } from "../../constants";
import LoginModal from "./LoginModal";
import EmailModal from "./MagicLink/EmailModal";

const SignUpComponent = () => {
  const { isOpen: isLoginModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose } = useDisclosure();
  const { isOpen: isEmailModalOpen, onOpen: onEmailModalOpen, onClose: onEmailModalClose } = useDisclosure();
  
  return (
    <Flex justifyContent="center" alignItems="center">
      <Center
        p={1}
        flexDir="column"
        height="60vh"
        width={{ base: "90%", md: "600px" }}
        boxShadow="lg"
      >
        <Box mb={8}>
          <Image
            alt="Logo"
            width={110}
            height={110}
            objectFit="cover"
            src="/VSC-Logo.png"
          />
        </Box>
        <Box width="full" maxWidth="md" p={1}>
          <VStack spacing={4}>
            <Button
              leftIcon={<Image src="/hive.svg" alt="Hive logo" boxSize="4" />}
              variant="outline"
              width="full"
              onClick={onLoginModalOpen}
            >
              {BUTTON_LABELS.signInWithHive}
            </Button>
            <LoginModal isOpen={isLoginModalOpen} onClose={onLoginModalClose} />

            {/* For Ethereum  */}
            <Button
              leftIcon={<FaEthereum />}
              variant="outline"
              width="full"
            >
              {BUTTON_LABELS.signUpWithEth}
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
            <Button
              leftIcon={<BiLogoGmail fontSize="2xl" />}
              variant="outline"
              width="full"
              onClick={onEmailModalOpen}
            >
              {BUTTON_LABELS.signUpWithEmail}
            </Button>
            <EmailModal isOpen={isEmailModalOpen} onClose={onEmailModalClose} />
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
};

export default SignUpComponent;
