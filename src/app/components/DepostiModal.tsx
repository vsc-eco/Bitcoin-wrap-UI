"use client";
import React, { use } from 'react'
import { useState } from 'react'
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import {FaClipboardQuestion} from "react-icons/fa6"
import {CiShare1} from "react-icons/ci"

import {Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Center,
  Container,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  } from "@chakra-ui/react";

type Props = {}

const DepostiModal = (props: Props) => {
  
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)


  return (
    <>
     <Button onClick={handleOpen}>Deposit</Button>
     <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW="700px" maxH="900px">
          <ModalHeader>
            <Center>Awaiting your deposit</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} my={4} mx={8}>
            <Container style={{display:"flex", justifyContent:"space-between"}}>
              <Text fontSize="sm">Exchange ID: dkajklsnfhalkandlksd2324</Text>
              <div style={{display:"flex"}}>
              <FaClipboardQuestion />
              <Text>
                Need help?
              </Text>
              </div>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DepostiModal