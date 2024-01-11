//TODO: make the logo between the Header and the Text
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
import { useAccountContext } from "../../context/AccountContext";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUserName] = useState<string | undefined>("");

  const handleUsername = (e: any) => {
    setUserName(e.target.value);
  };

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
                <Box mb={4}>Login to VSC</Box>
              </Heading>
              <Image
                alt="vsc logo"
                height={200}
                width={200}
                src="/logo.svg"
                objectFit="cover"
              />
              <Text mb={8}>
                Select one of the supported login options that help keep your
                access safe and decentralized.
              </Text>
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

                <Box border={"1px solid grey"} borderRadius={"xl"} p={1}>
                  <Flex
                    align="center"
                    backgroundColor={"grey.200"}
                    opacity={0.5}
                    position={"relative"}
                    py={4}
                  >
                    <Text
                      position={"absolute"}
                      left={32}
                      fontSize={"2xl"}
                      top={8}
                    >
                      Coming Soon
                    </Text>
                    <Flex mx={2} borderRadius={"2xl"}>
                      <Image
                        alt="hivesigner Logo"
                        height={90}
                        width={200}
                        src="/hivesigner.png"
                        objectFit="cover"
                      />
                    </Flex>
                    <Input
                      placeholder="Enter username"
                      flexGrow={1}
                      value={username}
                      onChange={handleUsername}
                      isDisabled
                    />
                    <Link
                      href={`https://hivesigner.com/oauth2/authorize?client_id=${username}&redirect_uri=REDIRECT_URI&scope=vote,comment`}
                    >
                      <Button ml={2} onClick={handleUsername}>
                        →
                      </Button>
                    </Link>
                  </Flex>

                  <Flex
                    align="center"
                    backgroundColor={"grey.200"}
                    opacity={0.5}
                  >
                    <Flex mx={2} borderRadius={"2xl"}>
                      <Image
                        alt="hiveauth Logo"
                        height={90}
                        width={200}
                        src="/hiveauth.png"
                        objectFit="cover"
                      />
                    </Flex>
                    <Input
                      placeholder="Enter username"
                      flexGrow={1}
                      isDisabled
                    />
                    <Link>
                      <Button ml={2}>→</Button>
                    </Link>
                  </Flex>
                </Box>

                {/* This is for the magic link  */}
                {/* <Flex align="center">
                  <Flex mx={2} borderRadius={"2xl"}>
                    <Image
                      src="/magic.png"
                      alt="magiclink"
                      height={90}
                      width={200}
                    />
                  </Flex>
                  <Input
                    placeholder="Enter email"
                    flexGrow={1}
                    type="email"
                    value={email}
                    onChange={handleEmail}
                  />
                  <Link>
                    <Button ml={2} onClick={handleMagicLink}>
                      →
                    </Button>
                  </Link>
                </Flex> */}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button colorScheme="blue">Login</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
