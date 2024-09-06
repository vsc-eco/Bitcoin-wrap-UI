import {
  Button,
  Text,
  Input,
  Flex,
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
  InputLeftElement,
  Select,
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { getOutputs, useCreateTx } from '../hooks/VSC'
import { useQuery } from '@tanstack/react-query'
import { DHive } from '../const'

import styles from './TransferModal.module.css'
import { BlockchainActions } from '../hooks/blockchain'
import { Asset } from '../hooks/blockchain/assets'
import { useAuth } from '../hooks/auth'
import { HIVE_PREFIX } from '../hooks/auth/hive'

const TransferModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState(0)
  const [waitingForSig, setWaitingForSig] = useState(false)

  const isAmountValid = true //amount.trim() !== '' && /^\d*\.?\d*$/.test(amount) // Check if amount is not empty or only whitespace
  const { transfer } = useCreateTx()

  // const allowedAmount = useQuery({
  //   queryKey: ["transfer_balance", myDid],
  //   queryFn: async () => {
  //     const outputs = await getOutputs(myDid)
  //     const amount = outputs.map(e => e.balance).reduce((a, b) => {
  //       return a + b;
  //     })
  //     console.log('transferred allowed amount', amount)
  //     return amount;
  //   },
  // })

  const queryAccount = useQuery({
    queryKey: ['account_status', destination] as const,
    queryFn: async ctx => {
      try {
        const [account] = await DHive.database.getAccounts([ctx.queryKey[1]])
        console.log(ctx.queryKey, account)
        return account
      } catch {}
      return null
    },
  })

  const isValidDestination = !!queryAccount.data

  const isDisabled = false //!isValidDestination || true //amount > allowedAmount.data

  const handleSend = async () => {
    const auth = useAuth.getState()
    if (!auth.authenticated) {
      throw new Error('not logged in')
    }
    const method = auth.userId.startsWith(HIVE_PREFIX) ? 'hive' : 'eth'
    setWaitingForSig(true)
    await BlockchainActions(
      'transfer',
      method,
      destination,
      amount,
      Asset.VSC_HIVE,
    ).catch(e => console.log('tx signing failed', e))
    setWaitingForSig(false)
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={'transparent'}
        fontSize="xs"
      >
        Transfer
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className={styles.murPrompt}>
          <ModalHeader>Transfer</ModalHeader>
          {waitingForSig ? (
            <>Please sign the transaction...</>
          ) : (
            <>
              <ModalCloseButton />
              <ModalBody>
                <InputGroup
                  my={2}
                  className={styles.murInput}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.1em"
                    top="-2px"
                  >
                    @
                  </InputLeftElement>
                  <Input
                    _placeholder={{
                      color: 'gray.300',
                    }}
                    placeholder="Username"
                    isRequired
                    value={destination}
                    onChange={e => {
                      setDestination(e.target.value)
                    }}
                  />
                </InputGroup>
                {/* {isValidDestination ? (
              
            ) : (
              <Text color="tomato" fontSize="xs" px={2}>
                Account must be registered on this web portal.
              </Text>
            )} */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.1em"
                      top="-1px"
                    >
                      $
                    </InputLeftElement>
                    <Input
                      placeholder="0.00"
                      min={0}
                      type="number"
                      isRequired
                      value={amount}
                      onChange={e => setAmount(e.target.valueAsNumber)}
                    />
                  </InputGroup>

                  <Select
                    marginLeft="2.5%"
                    placeholder="Select Asset"
                  >
                    <option value="option1">Hive</option>
                    <option value="option2">Hive Dollar</option>
                  </Select>
                </div>
                {/* <Text
                  color="black"
                  fontSize={'medium'}
                >
                  Available Balance: {'TODO'}
                </Text> */}
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
                  mr={3}
                  onClick={onClose}
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={isDisabled}
                  colorScheme="blue"
                  mr={3}
                  onClick={handleSend}
                  className={`${styles.murButton} ${styles.murButtonPrimary}`}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default TransferModal
