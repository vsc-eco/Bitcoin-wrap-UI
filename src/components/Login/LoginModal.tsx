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
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiBorderRadius } from "react-icons/bi";
import { useAccountContext } from "../../context/AccountContext";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose }) => {

  const [username, setUserName] = useState<string | undefined>("");

  const handleUsername = (e: any) => {
    setUserName(e.target.value);
    console.log(username)
  }

  
  
  const { triggerLoginWithHive, myDid } = useAccountContext();
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
                <Flex align="center">
                  <Flex
                    mx={2}
                    color={"black"}
                    borderRadius={"2xl"}
                    onClick={triggerLoginWithHive}
                  >
                    <Image
                      alt="keychain Logo"
                      height={90}
                      width={200}
                      src="/keychain.png"
                      objectFit="cover"
                    />
                  </Flex>
                  <Input placeholder="Enter username" flexGrow={1} />
                  <Link>
                  <Button ml={2}>→</Button>
                  </Link>
                </Flex>

                <Flex align="center">
                  <Flex mx={2} borderRadius={"2xl"}>
                    <Image
                      alt="hivesigner Logo"
                      height={90}
                      width={200}
                      src="/hivesigner.png"
                      objectFit="cover"
                    />
                  </Flex>
                  <Input placeholder="Enter username" flexGrow={1} value={username} onChange={handleUsername} />
                  <Link href={`https://hivesigner.com/oauth2/authorize?client_id=${username}&redirect_uri=https://localhost:3000/api/callback/hivesigner-auth&scope=vote,comment`}>
                    <Button ml={2} onClick={handleUsername}>→</Button>
                  </Link>
                </Flex>

                <Flex align="center">
                  <Flex mx={2} borderRadius={"2xl"}>
                    <Image
                      alt="hiveauth Logo"
                      height={90}
                      width={200}
                      src="/hiveauth.png"
                      objectFit="cover"
                    />
                  </Flex>
                  <Input placeholder="Enter username" flexGrow={1} />
                  <Link>
                  <Button ml={2}>→</Button>
                  </Link>
                </Flex>
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
