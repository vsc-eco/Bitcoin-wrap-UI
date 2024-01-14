//TODO: to fetch the details from the constant.ts and remove the .env file
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import {MagicApi} from '../../../constants'
//importing the magic link
import { Magic } from "magic-sdk";

function EmailModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    console.log();
  };

  //function for handling the login by email
  const handleMagicLink = async () => {
    try {
      const magic = new Magic(MagicApi.PUBLISHABLE_API_KEY);
      const didToken = await magic.auth.loginWithMagicLink({ email: email });
      console.log(didToken);
    } catch (err) {
      if (err) {
        throw err;
      } else {
        console.log(err);
      }
    }
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
  7        <ModalHeader>Enter Your Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="Email address"
              value={email}
              onChange={handleEmail}
            />
            <Button mt={4} colorScheme="blue" onClick={handleMagicLink}>
              Login
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EmailModal;
