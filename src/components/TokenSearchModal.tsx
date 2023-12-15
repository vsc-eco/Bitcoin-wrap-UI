//TODO: to conditionally add the component and render the from the json data
import React from "react";
import {
  Box,
  Button,
  Text,
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { SearchIcon } from "@chakra-ui/icons";
import { CiShare1 } from "react-icons/ci";

import { tokens } from "../../TokenData";

function TokenSearchModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search a Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input type="text" placeholder="Search..." />
            </InputGroup>
            <Flex>
              <Text fontSize={"sm"}>Popular Tokens</Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              {tokens.slice(0, 4).map((token, i) => (
                <Flex key={i} boxShadow={"lg"} p={2} borderRadius={"xl"}>
                  <Image
                    src={`/token_images/${token.image}`}
                    alt={`image${i}`}
                    width={24}
                    height={24}
                  />
                  <Text px={1}>{token.tokenName}</Text>
                </Flex>
              ))}
            </Flex>

            <Box w={"full"} h={0.5} bgColor={"blue.100"} />
            <Flex justifyContent={"space-between"}>
              <Text fontSize={"xs"}>Token</Text>
              <Text fontSize={"xs"}>Balance/Address</Text>
            </Flex>
            {tokens.map((token, i) => (
              <Flex key={i} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Image
                    src={`/token_images/${token.image}`}
                    alt={`image${i}`}
                    width={24}
                    height={24}
                  />
                  <Box px={1} >
                    <Text fontSize={"xs"}>{token.tokenName}</Text>
                    <Text fontSize={"2xs"}>{token.fullname}</Text>
                  </Box>
                </Flex>
                <Flex alignItems={"center"}>
                  <Flex px={1}>
                    <Text fontSize={"sm"}>{token.balanceAddr}</Text>
                  </Flex>
                  <CiShare1 />
                </Flex>
              </Flex>
            ))}
            <Button colorScheme="teal" onClick={onClose}>
              View Token List
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default TokenSearchModal;
