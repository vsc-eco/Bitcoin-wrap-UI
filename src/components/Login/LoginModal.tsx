import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { BiBorderRadius } from "react-icons/bi";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8} align="center">
              <Heading as="h2" size="xl" fontWeight="bold" mb={4}>
                Login to VSC
              </Heading>
              <Text mb={8}>
                Select one of the supported login options that help keep your
                access safe and decentralized.
              </Text>
              <Box mb={4}>
                <Image
                  alt="vsc logo"
                  height={200}
                  width={200}
                  src="/logo.svg"
                  objectFit="cover"
                />
              </Box>
              <VStack spacing={4} w="full">
                {["keychain", "hivesigner", "hiveauth"].map((service) => (
                  <Flex align="center" key={service}>
                    <Flex mx={2} color={"black"} borderRadius={"2xl"}>
                      <Image
                        alt={`${service} Logo`}
                        height={90}
                        width={200}
                        src={`/${service}.png`}
                        objectFit="cover"
                      />
                    </Flex>
                    <Input placeholder="Enter username" flexGrow={1} />
                    <Button ml={2}>→</Button>
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
