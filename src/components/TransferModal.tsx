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
  Icon,
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
import { ETH_PREFIX } from '../hooks/auth/wagmi-web3modal'
import { TbTransfer } from 'react-icons/tb'
import { IoIosSend } from 'react-icons/io'

const assets = [
  {
    name: 'HIVE on VSC',
    asset: 'VSC_HIVE',
  },
  {
    name: 'HIVE on Hive',
    asset: 'HIVE_HIVE',
  },
  {
    name: 'HBD on VSC',
    asset: 'VSC_HBD',
  },
  {
    name: 'HBD on Hive',
    asset: 'HIVE_HBD',
  },
] satisfies { name: string; asset: keyof typeof Asset }[]

const ethReg = new RegExp('^(0x)?[0-9a-fA-F]{40}$')
const hiveReg = new RegExp(
  '^(?=.{3,16}$)[a-z][0-9a-z-]{1,}[0-9a-z]([.][a-z][0-9a-z-]{1,}[0-9a-z]){0,}$',
)

const TransferModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState(0)
  const [waitingForSig, setWaitingForSig] = useState(false)
  const [asset, setAsset] = useState<keyof typeof Asset>(assets[0].asset)

  const [isRecipientValid, parsedDestination] = (ethReg.test(destination) && [
    true,
    ETH_PREFIX + destination,
  ]) ||
    (hiveReg.test(destination) && [true, HIVE_PREFIX + destination]) ||
    (destination.startsWith(HIVE_PREFIX)
      ? hiveReg.test(destination.substring(HIVE_PREFIX.length)) && [
          true,
          destination,
        ]
      : ethReg.test(destination.substring(ETH_PREFIX.length)) && [
          true,
          destination,
        ]) || [false, '']

  const isAmountValid = /^\d*\.?\d{0,3}$/.test(amount.toString()) // Check if amount is not empty or only whitespace
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
    queryKey: ['account_status', parsedDestination] as const,
    queryFn: async ctx => {
      try {
        const [account] = await DHive.database.getAccounts([ctx.queryKey[1]])
        console.log(ctx.queryKey, account)
        return account || null
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
      method,
      'transfer',
      parsedDestination,
      amount,
      Asset[asset],
    ).catch(e => console.log('tx signing failed', e))
    setWaitingForSig(false)
    onClose()
  }

  return (
    <>
      <Flex
        onClick={onOpen}
        bgColor={'transparent'}
        fontSize="sm"
        gap={2}
        alignItems={'center'}
      >
        <Icon as={IoIosSend} />
        <Text>Send Transfer</Text>
      </Flex>

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
                    onChange={e => setAsset(e.currentTarget.value as any)}
                    defaultValue={asset}
                  >
                    {assets.map(({ name, asset }, index) => (
                      <option
                        key={asset}
                        value={asset}
                      >
                        {name}
                      </option>
                    ))}
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
                {!isRecipientValid && (
                  <Text
                    color="tomato"
                    fontSize={'smaller'}
                    px={2}
                  >
                    Recipient must be a Hive username or an Ethereum wallet
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
