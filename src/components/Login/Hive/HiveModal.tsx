//TODO: hook up the functionality
//TODO: change the name to login with HIVE
//TODO: import the icons and have title element beside it put it 2 in a row
//TODO:
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
  Grid,
  GridItem,
  Icon,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import { useAccountContext } from "../../../context/AccountContext";
import { MdArrowCircleRight } from "react-icons/md";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const HiveModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUserName] = useState<string | undefined>("");
  const [selectedItem, setSelectedItem] =  useState<string>("Keychain")

  const handleUsername = (e: any) => {
    setUserName(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      triggerLoginWithHive();
    }
  };

  const handleTick = (optionName: string) => {
     setSelectedItem(optionName)
  }

  const loginOptions = [
    { name: "Keychain", image: "/keychain.svg", disabled: false },
    { name: "Hivesigner", image: "/hivesigner.svg", disabled: false },
    { name: "Hiveauth", image: "/hiveauth-light.svg", disabled: false },
    { name: "HiveLedger", image: "/ledger.svg", disabled: false },
    { name: "PeakVault", image: "/peakvault.svg", disabled: false },
  ];

  const { triggerLoginWithHive, myDid } = useAccountContext();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
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
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsername}
                  onKeyDown={handleKeyDown}
                />
                <Button bgColor={"gray.50"} variant="sm" size={"sm"}>
                  <Icon as={MdArrowCircleRight} />
                </Button>
              </Flex>
              <Grid templateColumns="repeat(2, 1fr)" gap={2} w="full">
                {loginOptions.map((option, index) => (
                  <GridItem key={index}>
                    <VStack>
                      <Flex gap={2} alignItems={"center"} position={"relative"} w={36} onClick={() => handleTick(option.name)}>
                        <Image
                          alt={`${option.name} Logo`}
                          height={25}
                          width={25}
                          src={option.image}
                          objectFit="contain"
                        />
                        <Text fontSize="sm" fontWeight={"semibold"}>
                          {option.name}
                        </Text>
                        <Checkbox position="absolute" top="0" right="0" h={1} w={1} colorScheme="green" isChecked={selectedItem === option.name}>
                        </Checkbox>
                      </Flex>
                      {option.disabled && (
                        <Text fontSize="xs" color="gray.500">
                          Coming Soon
                        </Text>
                      )}
                    </VStack>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
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

