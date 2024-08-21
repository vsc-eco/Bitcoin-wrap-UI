import {
  Button,
  Flex,
  Input,
  InputGroup,
  useColorModeValue,
  InputLeftAddon,
  Text,
  Box,
  VStack,
  Icon,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdOutlineSwapVert } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaBitcoin } from 'react-icons/fa'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { tokens, TokenName } from '../../TokenData'
import TokenSearchModal from '../TokenSearchModal'
import { MdAccountBalanceWallet } from 'react-icons/md'
import styles from './SwapComponents.module.css'

type Props = {
  showModal: boolean
  handleOpen: () => void
  handleClose: () => void
}

const SwapComponent = (props: Props) => {
  const [tokenAmount, setTokenAmount] = useState<string>('')
  const [IsReload, setIsReload] = useState(true)
  const [fromToken, setFromToken] = useState<TokenName>('HIVE')
  const [toToken, setToToken] = useState<TokenName>('HBD')

  const [choosingToken, setChoosingToken] = useState<'to' | 'from' | null>(null)

  // <compoenent tokenName={fromToken}  />
  // import tokens from the tokenData
  // tokens[token]
  // <compoenent token={toToken}  />

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(event.target.value)
  }

  const buttonBgColor = '#b8e3f2'
  const buttonTextColor = useColorModeValue('blue.600', 'blue.800')

  const setToken = (chosenToken: TokenName) => {
    const prevChosenToken = choosingToken === 'to' ? toToken : fromToken
    const prevOtherToken = choosingToken === 'from' ? toToken : fromToken
    if (chosenToken === prevChosenToken) {
      setChoosingToken(null)
      return
    }

    if (chosenToken === prevOtherToken) {
      if (choosingToken === 'to') {
        setFromToken(prevChosenToken)
        setToToken(prevOtherToken)
      } else {
        setToToken(prevChosenToken)
        setFromToken(prevOtherToken)
      }
      setChoosingToken(null)
      return
    }

    if (choosingToken === 'to') {
      setToToken(chosenToken)
    } else {
      setFromToken(chosenToken)
    }
    setChoosingToken(null)
  }

  const swapTokens = () => {
    setToToken(fromToken)
    setFromToken(toToken)
  }

  return (
    <Flex
      justifyContent={'center'}
      p={5}
      maxW="700px"
      borderRadius="md"
      boxShadow="base"
      className={styles.parent_container}
    >
      <TokenSearchModal
        isOpen={choosingToken !== null}
        onClose={() => setChoosingToken(null)}
        setToken={setToken}
      />
      <VStack spacing={3}>
        <InputGroup>
          <Flex
            direction={'column'}
            w="full"
            borderRadius={6}
            boxShadow={'base'}
            border={'transparent'}
          >
            <Flex
              justifyContent={'space-between'}
              px={4}
              h={3}
              mt={2}
              alignItems={'flex-end'}
              className={styles.from_input}
            >
              <Text
                fontSize="12px"
                className={styles.text}
              >
                From
              </Text>
              <Flex
                alignItems={'center'}
                gap={1}
              >
                <Icon
                  as={MdAccountBalanceWallet}
                  className={styles.icon}
                />
                <Text
                  fontSize={'xs'}
                  className={styles.text}
                >
                  Wallet not connected
                </Text>
              </Flex>
            </Flex>

            <Flex>
              <InputLeftAddon
                h={12}
                border={'transparent'}
                bgColor={'white'}
              >
                <Flex
                  _hover={{ color: '#5266eb' }}
                  borderRadius={'md'}
                  alignItems={'center'}
                >
                  <Flex
                    cursor={'pointer'}
                    onClick={() => setChoosingToken('from')}
                    alignItems={'center'}
                  >
                    <Text
                      fontSize={'2xl'}
                      px={1}
                    >
                      <Image
                        src={tokens[fromToken].image}
                        alt={fromToken}
                        width="24"
                        height="24"
                      />
                    </Text>
                    <Text fontSize={'xl'}>{fromToken}</Text>
                  </Flex>
                  <IoMdArrowDropdown />
                </Flex>
                <Box
                  h="60%"
                  borderLeft="1px solid black"
                  mx={1}
                  alignSelf="center"
                ></Box>
                <Button
                  h="1.75rem"
                  size="xs"
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                  onClick={() => setTokenAmount('Max')}
                  mx={1}
                >
                  Max
                </Button>
                <Button
                  h="1.75rem"
                  size="xs"
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                  onClick={() => setTokenAmount('Half')}
                  mx={1}
                >
                  Half
                </Button>
              </InputLeftAddon>
              <Input
                h={10}
                type="number"
                w={'full'}
                textAlign={'right'}
                value={tokenAmount}
                onChange={handleTokenChange}
                focusBorderColor="transparent"
                border={'transparent'}
              />
            </Flex>
            <Flex
              justifyContent={'space-between'}
              px={5}
              h={4}
              mb={2}
              alignItems={'flex-start'}
            >
              <Flex>
                {' '}
                {tokenAmount && <Text fontSize={'xs'}>Max Value</Text>}
              </Flex>
            </Flex>
          </Flex>
        </InputGroup>
        <Flex
          h={5}
          alignItems={'center'}
          justifyContent={'space-between'}
          w="90%"
        >
          <Flex
            px={4}
            alignItems={'center'}
            onClick={swapTokens}
            cursor="pointer"
          >
            <Text
              fontSize={'2xl'}
              className={styles.icon}
            >
              <MdOutlineSwapVert />
            </Text>
          </Flex>
          <Flex className={styles.icon}>
            {IsReload ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3 }}
              >
                <AiOutlineLoading3Quarters />
              </motion.div>
            ) : (
              <AiOutlineLoading3Quarters />
            )}
          </Flex>
        </Flex>

        <InputGroup>
          <Flex
            direction={'column'}
            w="full"
            borderRadius={6}
            boxShadow={'base'}
            border={'transparent'}
          >
            <Flex
              justifyContent={'space-between'}
              px={4}
              h={4}
              mt={2}
            >
              <Text
                fontSize={'12px'}
                className={styles.text}
              >
                To
              </Text>
              <Flex
                alignItems={'center'}
                gap={1}
              >
                <Icon
                  as={MdAccountBalanceWallet}
                  className={styles.icon}
                />
                <Text
                  fontSize={'xs'}
                  className={styles.text}
                >
                  Wallet not connected
                </Text>
              </Flex>
            </Flex>

            <Flex>
              <InputLeftAddon
                h={12}
                bgColor={'white'}
                border={'transparent'}
              >
                <Flex
                  _hover={{ color: '#5266eb' }}
                  borderRadius={'md'}
                  alignItems={'center'}
                >
                  <Flex
                    cursor={'pointer'}
                    onClick={() => setChoosingToken('to')}
                    alignItems={'center'}
                  >
                    <Text
                      fontSize={'2xl'}
                      px={1}
                    >
                      <Image
                        src={tokens[toToken].image}
                        alt={toToken}
                        width="24"
                        height="24"
                      />
                    </Text>
                    <Text fontSize={'xl'}>{toToken}</Text>
                  </Flex>
                  <IoMdArrowDropdown />
                </Flex>
                <Box
                  h="60%"
                  borderLeft="1px solid black"
                  mx={1}
                  alignSelf="center"
                ></Box>
                <Button
                  h="1.75rem"
                  size="xs"
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                  onClick={() => setTokenAmount('Max')}
                  mx={1}
                  isDisabled
                >
                  Max
                </Button>
                <Button
                  h="1.75rem"
                  size="xs"
                  isDisabled
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                  onClick={() => setTokenAmount('Half')}
                  mx={1}
                >
                  <Text>Half</Text>
                </Button>
              </InputLeftAddon>
              <Input
                h={10}
                w={'full'}
                textAlign={'right'}
                value={tokenAmount}
                onChange={handleTokenChange}
                focusBorderColor="transparent"
                border={'transparent'}
                readOnly
              />
            </Flex>
            <Flex
              justifyContent={'space-between'}
              px={5}
              h={4}
              mb={2}
            >
              <Flex></Flex>
              <Flex>
                {' '}
                {tokenAmount && <Text fontSize={'xs'}>Max Value</Text>}
              </Flex>
            </Flex>
          </Flex>
        </InputGroup>
        <Button
          w="full"
          className={`${styles.murButton} ${styles.murButtonPrimary}`}
        >
          Swap
        </Button>
      </VStack>
    </Flex>
  )
}

export default SwapComponent
