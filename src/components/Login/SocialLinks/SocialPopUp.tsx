import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { PiGoogleChromeLogoBold } from "react-icons/pi";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaDiscord } from "react-icons/fa";

//exporting the button labels from the constants.ts file
import { BUTTON_LABELS } from "../../../constants";

const SocialButton = ({ leftIcon, children }) => (
  <Button variant="outline" width="full" mb={3}>
    <Flex justifyContent="space-between" width="full" align="center">
      <Box fontSize={"20px"}>{leftIcon}</Box> 
      <Box>{children}</Box> 
    </Flex>
  </Button>
);

const SocialPopUp = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Sign Up with Email */}
          <SocialButton leftIcon={<BiLogoGmail fontSize="2xl" />}>
            {BUTTON_LABELS.signUpWithEmail}
          </SocialButton>

          {/* Google Sign Up Button */}
          <SocialButton leftIcon={<PiGoogleChromeLogoBold fontSize="2xl" />}>
            {BUTTON_LABELS.signUpWithGoogle}
          </SocialButton>

          {/* Discord sign up button  */}
          <SocialButton leftIcon={<FaDiscord fontSize="2xl" />}>
            {BUTTON_LABELS.signUpWithGoogle}
          </SocialButton>

          {/* Github sign up button  */}
          <SocialButton leftIcon={<FaGithub fontSize="2xl" />}>
            {BUTTON_LABELS.signUpWithGoogle}
          </SocialButton>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SocialPopUp;
