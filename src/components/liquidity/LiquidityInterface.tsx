//TODO:
import React, { useLayoutEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon, // Fix: Remove duplicated import statement
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoMdArrowDropdown } from 'react-icons/io'
import { FaBitcoin } from 'react-icons/fa'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { CgArrowsExchange } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa6'
import styles from './LiquidityInterface.module.css'

import Image from 'next/image'
//importing motion component from framer
import { motion } from 'framer-motion'
import { MdAccountBalanceWallet } from 'react-icons/md'

type Props = {
  showModal: boolean
  handleOpen: () => void
  handleClose: () => void
}

const LiquidityInterface = (props: Props) => {
  const [tokenAmount, setTokenAmount] = useState<{ [key: string]: string }>({
    HBD: '',
    BTC: '',
  })
  //making a useState for checking wether wallet is empty or not
  const [isWalletValid, setIsWalletValid] = useState<boolean | undefined>(false)

  //function for checking wether these values are filled or empty
  const hasValues = Object.values(tokenAmount).some(value => value !== '')

  const handleTokenChange =
    (token: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setTokenAmount({
        ...tokenAmount,
        [token]: event.target.value,
      })
    }

  const handleMax = (token: string) => {
    // Replace this with actual max balance logic
    const maxBalances = {
      HBD: '0.28957553',
      BTC: '129.978543',
    }
    setTokenAmount(prevTokenAmount => ({
      ...prevTokenAmount,
      [token]: maxBalances[token],
    }))
  }

  //useState for reloading
  const [IsReload, setIsReload] = useState(true)
  const [fromToken, setFromToken] = useState<string>('HIVE')
  const [toToken, setToToken] = useState<string>('HBD')

  useLayoutEffect(() => {
    const reloadTime = setTimeout(() => {
      setIsReload(false)
    }, 3000)
  }, [])

  return (
    <Box
      maxW="600px"
      p={4}
      borderRadius="md"
      boxShadow="base"
    >
      <VStack spacing={4}>
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
            >
              <Text fontSize="12px">From</Text>
              <Flex
                alignItems={'center'}
                gap={1}
              >
                <Icon
                  as={MdAccountBalanceWallet}
                  className={styles.icons}
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
                h={10}
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
                    onClick={props.handleOpen}
                    alignItems={'center'}
                  >
                    <Text
                      fontSize={'2xl'}
                      px={1}
                    >
                      <Image
                        src="./hive.svg"
                        alt="hive"
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
                  onClick={() => handleMax('HBD')}
                  mx={1}
                >
                  Max
                </Button>
                <Button
                  h="1.75rem"
                  size="xs"
                  onClick={() =>
                    setTokenAmount({
                      ...tokenAmount,
                      HBD: (parseFloat(tokenAmount.HBD) / 2).toString(),
                    })
                  }
                  mx={1}
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                >
                  Half
                </Button>
              </InputLeftAddon>
              <Input
                h={10}
                type="number"
                w={'full'}
                textAlign={'right'}
                value={tokenAmount['HBD']}
                onChange={handleTokenChange('HBD')}
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
                {hasValues && <Text fontSize={'xs'}>Max Value</Text>}
              </Flex>
            </Flex>
          </Flex>
        </InputGroup>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          w="full"
        >
          <Flex
            alignItems={'center'}
            gap={1}
          >
            <Text className={styles.icons}>
              <FaPlus />
            </Text>
            <Text
              fontSize="sm"
              px={1}
            >
              Balance: 129.978543 USDC
            </Text>
            <Text className={styles.icons}>
              <CgArrowsExchange />
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            w={12}
            justifyContent={'space-between'}
          >
            <Text
              onClick={props.handleOpen}
              _hover={{ background: '#d0ebf2' }}
              p={1}
              borderRadius={'lg'}
              cursor={'pointer'}
              className={styles.icons}
            >
              <HiMiniMagnifyingGlass />
            </Text>
            <Text className={styles.icons}>
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
            </Text>
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
              h={3}
              mt={2}
              alignItems={'flex-end'}
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
                  className={styles.icons}
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
                h={10}
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
                    onClick={props.handleOpen}
                    alignItems={'center'}
                  >
                    <Text
                      fontSize={'2xl'}
                      px={1}
                    >
                      <Image
                        src="./hbd_green.svg"
                        alt="hive"
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
                  onClick={() => handleMax('HBD')}
                  mx={1}
                >
                  Max
                </Button>
                <Button
                  h="1.75rem"
                  size="xs"
                  className={`${styles.murButton} ${styles.murButtonSecondary}`}
                  onClick={() =>
                    setTokenAmount({
                      ...tokenAmount,
                      HBD: (parseFloat(tokenAmount.HBD) / 2).toString(),
                    })
                  }
                  mx={1}
                >
                  Half
                </Button>
              </InputLeftAddon>
              <Input
                h={10}
                w={'full'}
                textAlign={'right'}
                value={tokenAmount['HBD']}
                onChange={handleTokenChange('HBD')}
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
              <Flex></Flex>
              <Flex>
                {' '}
                {hasValues && <Text fontSize={'xs'}>Max Value</Text>}
              </Flex>
            </Flex>
          </Flex>
        </InputGroup>
        <Flex
          m={'auto'}
          direction={'column'}
          boxShadow={'base'}
          w="full"
          borderRadius={'lg'}
          p={4}
        >
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            className={styles.text}
          >
            <Flex>
              <Text>Base</Text>
            </Flex>
            <Flex>
              <Text>HBD</Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            className={styles.text}
          >
            <Flex>
              <Text>Pool Liquidity (HBD)</Text>
            </Flex>
            <Flex>
              <Text>3232 HBD</Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            className={styles.text}
          >
            <Flex>
              <Text>Pool liquidity (BTC)</Text>
            </Flex>
            <Flex>
              <Text>3238 BTC</Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            className={styles.text}
          >
            <Flex>
              <Text>LP supply</Text>
            </Flex>
            <Flex>
              <Text>327382372 LP</Text>
            </Flex>
          </Flex>
        </Flex>
        <Button
          w={'full'}
          isDisabled={!isWalletValid}
          className={`${styles.murButton} ${styles.murButtonPrimary}`}
        >
          Add Liquidity
        </Button>
      </VStack>
    </Box>
  )
}

export default LiquidityInterface
