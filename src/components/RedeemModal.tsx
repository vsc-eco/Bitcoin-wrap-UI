import React, { useState } from 'react'
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
  Box,
} from '@chakra-ui/react'
import { getOutputs, useCreateTx } from '../hooks/VSC'
import { DHive } from '../const'
import { useQuery } from '@tanstack/react-query'
import styles from './RedeemModal.module.css'

type Props = {}

const RedeemModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [amount, setAmount] = useState('')
  const [destination, setDestination] = useState('')
  const isAmountValid = amount.trim() !== '' && /^\d*\.?\d*$/.test(amount) // Check if amount is not empty or only whitespace

  const { redeem } = useCreateTx()

  const handleSend = async () => {
    // Add your logic to handle the "Send" button click

    onClose()
  }

  // const allowedAmount = useQuery({
  //   queryKey: ["transfer_balance", myDid],
  //   queryFn: async () => {
  //     const outputs = await getOutputs(myDid);
  //     const amount = outputs
  //       .map((e) => e.balance)
  //       .reduce((a, b) => {
  //         return a + b;
  //       });
  //     console.log("transferred allowed amount", amount);
  //     return amount;
  //   },
  // });

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={'transparent'}
        fontSize="xs"
      >
        Redeem
      </Button>
      <Box className={styles.parent_container}>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Redeem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup my={2}>
                <InputLeftAddon
                  w={32}
                  className={styles.modalLabel}
                >
                  BTC Address
                </InputLeftAddon>
                <Input
                  className={styles.input}
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                />
              </InputGroup>
              {/* <Text color="tomato" fontSize="xs" px={2}>
              Account not found!
            </Text> */}
              <InputGroup py={2}>
                <InputLeftAddon
                  w={32}
                  className={styles.modalLabel}
                >
                  Amount
                </InputLeftAddon>
                <Input
                  className={styles.input}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  isInvalid={!isAmountValid}
                  errorBorderColor="transaparent"
                />
              </InputGroup>
              <Text className={styles.text}>Available Balance: {'TODO'}</Text>
              {!isAmountValid && (
                <Text
                  color="tomato"
                  fontSize={'smaller'}
                  px={2}
                >
                  Please enter a valid amount
                </Text>
              )}
              {false ? (
                <Text
                  color="tomato"
                  fontSize={'smaller'}
                  px={2}
                >
                  Too low balance!
                </Text>
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Button
                className={`${styles.reButton} ${styles.secButton}`}
                colorScheme="gray"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className={`${styles.reButton} ${styles.priButton}`}
                mr={3}
                onClick={handleSend}
                isDisabled={!isAmountValid}
              >
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

export default RedeemModal
