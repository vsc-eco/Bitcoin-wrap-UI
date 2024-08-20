//TODO: hook up the functionality
//TODO: change the name to login with HIVE
//TODO: import the icons and have title element beside it put it 2 in a row
//TODO:
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  Flex,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";

import React from "react";
import Image from "next/image";
import { MdArrowCircleRight } from "react-icons/md";
import styles from "./Hive.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { Providers } from "@aioha/aioha";
import { AuthActions } from "../../../hooks/auth";
import { useNavigate } from "react-router-dom";

const DEFAULT_AUTH_OPTION: LoginOption = "Keychain";

const USERNAME_FIELD = "username";
const LOGIN_METHOD_FIELD = "loginMethod";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const loginOptions = [
  { name: "Keychain", image: "/keychain.svg", disabled: false },
  { name: "Hivesigner", image: "/hivesigner.svg", disabled: false },
  { name: "Hiveauth", image: "/hiveauth-light.svg", disabled: false },
  { name: "HiveLedger", image: "/ledger.svg", disabled: false },
  { name: "PeakVault", image: "/peakvault.svg", disabled: false },
] as const;

type LoginOption = (typeof loginOptions)[number]["name"];

const providerMap = {
  Keychain: Providers.Keychain,
  Hivesigner: Providers.HiveSigner,
  Hiveauth: Providers.HiveAuth,
  HiveLedger: Providers.Ledger,
  PeakVault: Providers.PeakVault,
} satisfies Record<LoginOption, Providers>;

function broke(what: string): never {
  throw new Error(`This is a bug: what=${what}`);
}

const HiveModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form
              action={(data) => {
                const loginMethod = data
                  .get(LOGIN_METHOD_FIELD)
                  ?.valueOf() as LoginOption;
                if (typeof loginMethod !== "string") {
                  return broke("loginMethod");
                }
                const username = data.get(USERNAME_FIELD)?.valueOf();
                if (typeof username !== "string") {
                  return broke("username");
                }
                const provider = providerMap[loginMethod];
                AuthActions.login("hive", provider, username).then(() =>
                  navigate("/")
                );
              }}
            >
              <VStack spacing={8} align="center">
                <Heading size="md" fontWeight="semibold" mb={4}>
                  Login with HIVE
                </Heading>
                <Image
                  alt="vsc logo"
                  height={100}
                  width={100}
                  src="/hive.svg"
                  objectFit="cover"
                />
                <Text mb={4} textAlign="center">
                  Select one of the supported login options that help keep your
                  access safe and decentralized.
                </Text>
                <Flex w="full" justifyContent="space-between" gap="2">
                  <Input
                    name={USERNAME_FIELD}
                    placeholder="Enter username"
                    required
                    pattern="^(?=.{3,16}$)[a-z][0-9a-z\-]{1,}[0-9a-z]([\.][a-z][0-9a-z\-]{1,}[0-9a-z]){0,}$"
                  />
                  <Button
                    zIndex="calc(var(--chakra-zIndices-modal) + 10)"
                    position="absolute"
                    right="1px"
                    margin={1}
                    transform="translateX(-45%)"
                    type="submit"
                    bgColor={"gray.50"}
                    variant="sm"
                    size={"sm"}
                  >
                    <Icon fontSize="20px" as={MdArrowCircleRight} />
                  </Button>
                </Flex>
                <Flex gap={2} w="full" wrap="wrap" justifyContent="center">
                  {loginOptions.map((option, index) => (
                    <GridItem key={index}>
                      <VStack>
                        <Flex
                          gap={1}
                          alignItems={"center"}
                          position={"relative"}
                        >
                          <Button
                            as="label"
                            aria-description={option.name}
                            colorScheme="gray"
                            w={125}
                            className={styles.container}
                          >
                            <Image
                              alt={`${option.name} Logo`}
                              height={option.name === "Hivesigner" ? 20 : 25}
                              width={option.name === "Hivesigner" ? 20 : 25}
                              src={option.image}
                              objectFit="contain"
                            />
                            <Text fontSize={"sm"}>{option.name}</Text>
                            <input
                              type="radio"
                              name={LOGIN_METHOD_FIELD}
                              value={option.name}
                              defaultChecked={
                                option.name === DEFAULT_AUTH_OPTION
                              }
                            />
                            <span className={styles.checkmark}>
                              <Icon
                                className={styles.icon}
                                as={FaCheckCircle}
                              />
                            </span>
                          </Button>
                        </Flex>
                        {option.disabled && (
                          <Text fontSize="xs" color="gray.500">
                            Coming Soon
                          </Text>
                        )}
                      </VStack>
                    </GridItem>
                  ))}
                </Flex>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HiveModal;
