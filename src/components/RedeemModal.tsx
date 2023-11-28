import React from "react";
import {
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {};

const RedeemModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} bgColor={"transparent"}>
        Redeem
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={2}>
              <Input readOnly value={"1Gx9FCknxSsLfFDzFdn75Xgqx95sDp38ir"} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon w={32}>Amount</InputLeftAddon>
              <Input />
            </InputGroup>
            <Text color='tomato' fontSize={"smaller"} px={2}>Not enough balance</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Send
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RedeemModal;
