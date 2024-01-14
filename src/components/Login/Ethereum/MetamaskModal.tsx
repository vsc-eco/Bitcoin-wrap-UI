//TODO: Connect with metamask button should be on the center
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
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";

function MetaMaskModal({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect to MetaMask</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Click the button below to connect with your MetaMask wallet.
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent={"center"}>
              <Button
                leftIcon={
                  <Image
                    src="/metamask.svg"
                    alt="metamask"
                    height={20}
                    width={20}
                  />
                }
                colorScheme="blue"
                onClick={onClose}
              >
                MetaMask
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MetaMaskModal;
