import React from "react";
import {
  Flex,
  Center,
  Box,
  Button,
  Image,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEthereum, FaGithub, FaDiscord } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { PiGoogleChromeLogoBold } from "react-icons/pi";
import { BUTTON_LABELS } from "../../constants";
import HiveModal from "./Hive/HiveModal";
import MetaMaskModal from "./Ethereum/MetamaskModal";
import SocialPopUp from "./SocialLinks/SocialPopUp";

const MultipleIcons = ({ size }) => {
  return (
    <Flex>
      <Flex px={2}>
        <BiLogoGmail fontSize={size} />
      </Flex>
      <Flex px={2}>
        <PiGoogleChromeLogoBold fontSize={size} />
      </Flex>
      <Flex px={2}>
        <FaDiscord fontSize={size} />
      </Flex>
      <Flex px={2}>
        <FaGithub fontSize={size} />
      </Flex>
    </Flex>
  );
};

const SignUpComponent = () => {
  // Disclosure hooks for Hive, Ethereum, and SocialPopUp
  const {
    isOpen: isHiveModal,
    onOpen: onHiveModalOpen,
    onClose: onHiveModalClose,
  } = useDisclosure();
  const {
    isOpen: isEthModalOpen,
    onOpen: onEthModalOpen,
    onClose: onEthModalClose,
  } = useDisclosure();
  const {
    isOpen: isSocialOpen,
    onOpen: onSocialOpen,
    onClose: onSocialClose,
  } = useDisclosure();

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
              variant="outline"
              width="full"
              mb={3}
              leftIcon={
                <Image src="/hive.svg" alt="hive_logo" height={6} width={6} />
              }
              onClick={onHiveModalOpen}
            >
              {BUTTON_LABELS.signInWithHive}
            </Button>
            <HiveModal isOpen={isHiveModal} onClose={onHiveModalClose} />

            {/* Ethereum Button */}
            <Button
              variant="outline"
              width="full"
              mb={3}
              leftIcon={<FaEthereum fontSize={"20px"} />}
              onClick={onEthModalOpen}
            >
              {BUTTON_LABELS.signUpWithEth}
            </Button>
            <MetaMaskModal isOpen={isEthModalOpen} onClose={onEthModalClose} />

            {/* Socials Button */}
            <Button
              variant="outline"
              width="full"
              mb={3}
              onClick={onSocialOpen}
              rightIcon={
                <Box>
                  <MultipleIcons size={22} />
                </Box>
              }
            >
              {BUTTON_LABELS.signUpWithSocials}
            </Button>
            <SocialPopUp isOpen={isSocialOpen} onClose={onSocialClose} />
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
};

export default SignUpComponent;
