//TODO: hook up the functionality
//TODO: change the name to login with HIVE
//TODO: import the icons and have title element beside it put it 2 in a row
//TODO:
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  Flex,
  Icon,
  HStack,
  Card,
  Box,
} from '@chakra-ui/react'

import React from 'react'
import Image from 'next/image'
import { MdArrowCircleRight } from 'react-icons/md'
import { Providers } from '@aioha/aioha'
import { AuthActions } from '../../../hooks/auth'
import { useNavigate } from 'react-router-dom'
import { LoginOptions } from './LoginOptionContainer'
import { LOGIN_METHOD_FIELD, LoginOption } from './LoginOption'

const USERNAME_FIELD = 'username'

interface Props {
  onClose: () => void
  isOpen: boolean
}

const loginOptions = [
  { name: 'Keychain', image: '/keychain.svg', disabled: false },
  { name: 'HiveLedger', image: '/ledger.svg', disabled: false },
  { name: 'Hivesigner', image: '/hivesigner.svg', disabled: true },
  { name: 'Hiveauth', image: '/hiveauth-light.svg', disabled: true },
] as const

const ANY_LOGIN_OPTION_DISABLED = !loginOptions.every(
  option => !option.disabled,
)

export type LoginOptionName = (typeof loginOptions)[number]['name']
export type LoginOptionType = (typeof loginOptions)[number]

const providerMap = {
  Keychain: Providers.Keychain,
  Hivesigner: Providers.HiveSigner,
  Hiveauth: Providers.HiveAuth,
  HiveLedger: Providers.Ledger,
} satisfies Record<LoginOptionName, Providers>

function broke(what: string): never {
  throw new Error(`This is a bug: what=${what}`)
}

const HiveModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form
              action={data => {
                const loginMethod = data
                  .get(LOGIN_METHOD_FIELD)
                  ?.valueOf() as LoginOptionName
                if (typeof loginMethod !== 'string') {
                  return broke('loginMethod')
                }
                const username = data.get(USERNAME_FIELD)?.valueOf()
                if (typeof username !== 'string') {
                  return broke('username')
                }
                const provider = providerMap[loginMethod]
                AuthActions.login('hive', provider, username).then(() =>
                  navigate('/'),
                )
              }}
            >
              <VStack
                spacing={8}
                align="center"
              >
                <Heading
                  size="md"
                  fontWeight="semibold"
                  mb={4}
                >
                  Login with HIVE
                </Heading>
                <Image
                  alt="vsc logo"
                  height={100}
                  width={100}
                  src="/hive.svg"
                  objectFit="cover"
                />
                <Text
                  mb={4}
                  textAlign="center"
                >
                  Select one of the supported login options that help keep your
                  access safe and decentralized.
                </Text>
                <Flex
                  w="full"
                  justifyContent="space-between"
                  gap="2"
                >
                  <Input
                    name={USERNAME_FIELD}
                    placeholder="Enter username"
                    required
                    pattern="^(?=.{3,16}$)[a-z][0-9a-z\-]{1,}[0-9a-z]([\.][a-z][0-9a-z\-]{1,}[0-9a-z]){0,}$"
                  />
                  <Button
                    zIndex="calc(var(--chakra-zIndices-modal) + 10)"
                    position="absolute"
                    right="1px"
                    margin={1}
                    transform="translateX(-45%)"
                    type="submit"
                    bgColor={'gray.50'}
                    variant="sm"
                    size={'sm'}
                  >
                    <Icon
                      fontSize="20px"
                      as={MdArrowCircleRight}
                    />
                  </Button>
                </Flex>
                <VStack w="full">
                  <LoginOptions>
                    {loginOptions.map(
                      option =>
                        !option.disabled && (
                          <LoginOption
                            key={option.name}
                            option={option}
                          />
                        ),
                    )}
                  </LoginOptions>
                  {ANY_LOGIN_OPTION_DISABLED && (
                    <VStack
                      paddingTop={5}
                      w="full"
                    >
                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        opacity={0.9}
                      >
                        Coming Soon
                      </Text>
                      <Box opacity={0.4}>
                        <LoginOptions>
                          {loginOptions.map(
                            option =>
                              option.disabled && (
                                <LoginOption
                                  key={option.name}
                                  option={option}
                                />
                              ),
                          )}
                        </LoginOptions>
                      </Box>
                    </VStack>
                  )}
                </VStack>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HiveModal
