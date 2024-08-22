import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Text,
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
} from '@chakra-ui/react'
import Image from 'next/image'
import { SearchIcon } from '@chakra-ui/icons'
import { CiShare1 } from 'react-icons/ci'
import { TokenInterface } from '../types/types'
import { tokens, Token } from '../TokenData'
import styles from './TokenSearchModal.module.css'

type Props = {
  isOpen: any
  onClose: () => void
  setToken: React.Dispatch<React.SetStateAction<string>>
}

function TokenSearchModal({ isOpen, onClose, setToken }: Props) {
  //make the function here
  const handleTokenClick = (token: Token) => {
    setToken(token.tokenName)
    if (token.tokenName === 'WBTC') {
      // alert("Bitcoin is coming soon!");
    } else {
      console.log(`The selected  token is the  ` + token.tokenName)
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className={styles.text} fontWeight={"semibold"}>Search a Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            spacing={4}
            align="stretch"
          >
            <InputGroup className={styles.murInput}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon className={styles.icon} />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search..."
              />
            </InputGroup>
            <Flex>
              <Text
                fontSize={'sm'}
                className={styles.text}
              >
                Popular Tokens
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              {Object.values(tokens)
                .slice(0, 4)
                .map((token, i) => (
                  <Flex
                    key={i}
                    boxShadow={'lg'}
                    p={2}
                    borderRadius={'xl'}
                    onClick={() => handleTokenClick(token)}
                    // cursor={token.tokenName === "WBTC" ? "not-allowed" : "pointer"}
                    // opacity={token.tokenName === "WBTC" ? 0.5 : 1}
                  >
                    <Image
                      src={token.image}
                      alt={`image${i}`}
                      width={24}
                      height={24}
                    />
                    <Text
                      px={1}
                      className={styles.text}
                    >
                      {token.tokenName}
                    </Text>
                  </Flex>
                ))}
            </Flex>

            <Box
              w={'full'}
              h={0.5}
              bgColor={'#7d88cf'}
            />
            <Flex justifyContent={'space-between'}>
              <Text
                fontSize={'xs'}
                className={styles.text}
              >
                Token
              </Text>
              <Text
                fontSize={'xs'}
                className={styles.text}
              >
                Balance/Address
              </Text>
            </Flex>
            {Object.values(tokens).map((token, i) => (
              <Flex
                key={i}
                justifyContent={'space-between'}
                _hover={{ bgColor: '#f3f4f7' }}
                cursor={'pointer'}
                px={1}
                borderRadius={'md'}
                onClick={() => handleTokenClick(token)}
              >
                <Flex alignItems={'center'}>
                  <Image
                    src={`./${token.image}`}
                    alt={`image${i}`}
                    width={24}
                    height={24}
                  />
                  <Box px={1}>
                    <Text fontSize={'xs'}>{token.tokenName}</Text>
                    <Text fontSize={'2xs'}>{token.fullname}</Text>
                  </Box>
                </Flex>
                {'balanceAddr' in token && (
                  <Flex alignItems={'center'}>
                    <Flex px={1}>
                      <Text fontSize={'sm'}>{token.balanceAddr}</Text>
                    </Flex>
                    <CiShare1 />
                  </Flex>
                )}
              </Flex>
            ))}
            <Button
              className={`${styles.murButton} ${styles.murButtonPrimary}`}
              onClick={onClose}
            >
              View Token List
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default TokenSearchModal
