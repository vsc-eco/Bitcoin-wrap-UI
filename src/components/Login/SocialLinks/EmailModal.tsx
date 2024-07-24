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
//importing the magic link
import { Magic } from "magic-sdk";

if (!process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY) {
  throw Error(
    "NEXT_PUBLIC_PUBLISHABLE_API_KEY env var is not set for Magic Link"
  );
}

function EmailModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  //function for handling the login by email
  const handleMagicLink = async () => {
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY!);
      const didToken = await magic.auth.loginWithMagicLink({ email: email });
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
          7 <ModalHeader>Enter Your Email</ModalHeader>
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
