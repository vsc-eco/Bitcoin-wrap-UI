import React from 'react'
import {
  Flex,
  Center,
  Box,
  Button,
  Image,
  VStack,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { BUTTON_LABELS } from '../../constants'
import HiveModal from './Hive/HiveModal'
import { AuthActions, useAuth } from '../../hooks/auth'
import { useNavigate } from 'react-router-dom'
import styles from './SignUpComponent.module.css'

const MultipleIcons = ({ size }) => {
  return (
    <Flex
      gap={2}
      alignItems={'center'}
    >
      <Flex>
        <Image
          alt="Logo"
          width={30}
          height={30}
          objectFit="cover"
          src="/google.svg"
        />
      </Flex>
      <Flex>
        <Image
          alt="Logo"
          width={25}
          height={25}
          objectFit="cover"
          src="/discord.svg"
        />
      </Flex>
      <Flex>
        <Image
          alt="Logo"
          width={25}
          height={25}
          objectFit="cover"
          src="/github.svg"
        />
      </Flex>
    </Flex>
  )
}

const EmailIcon = ({ size }) => (
  <Flex>
    <Flex px={2}>
      <Image
        alt="Logo"
        width={25}
        height={25}
        objectFit="cover"
        src="/gmail.svg"
      />
    </Flex>
  </Flex>
)

const SignUpComponent = () => {
  // Disclosure hooks for Hive, Ethereum, and SocialPopUp
  const {
    isOpen: isHiveModal,
    onOpen: onHiveModalOpen,
    onClose: onHiveModalClose,
  } = useDisclosure()

  const navigate = useNavigate()

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
    >
      <Center
        p={1}
        flexDir="column"
        height="60vh"
        width={{ base: '90%', md: '600px' }}
        boxShadow="lg"
      >
        <Box mb={8}>
          <Image
            alt="Logo"
            width={110}
            height={110}
            objectFit="cover"
            src="/vsc.svg"
          />
        </Box>
        <Box
          width="full"
          maxWidth="md"
          p={1}
        >
          <VStack spacing={4}>
            <Button
              variant="outline"
              width="full"
              mb={3}
              leftIcon={
                <Image
                  src="/hive.svg"
                  alt="hive_logo"
                  height={6}
                  width={6}
                />
              }
              onClick={onHiveModalOpen}
              className={styles.button}
            >
              <Text className={styles.text}>
                {BUTTON_LABELS.signInWithHive}
              </Text>
            </Button>
            <HiveModal
              isOpen={isHiveModal}
              onClose={onHiveModalClose}
            />

            {/* Ethereum Button */}
            <Button
              variant="outline"
              width="full"
              mb={3}
              leftIcon={
                <Image
                  src="/eth.svg"
                  alt="hive_logo"
                  height={25}
                  width={25}
                />
              }
              onClick={() => AuthActions.login('eth').then(() => navigate('/'))}
              className={styles.button}
            >
              <Text>{BUTTON_LABELS.signUpWithEth} </Text>
            </Button>

            {/* Socials Button */}
            <Button
              variant="outline"
              width="full"
              mb={3}
              onClick={() => AuthActions.login('eth').then(() => navigate('/'))}
              rightIcon={
                <Box>
                  <MultipleIcons size={22} />
                </Box>
              }
              className={styles.button}
            >
              <Text> {BUTTON_LABELS.signUpWithSocials} </Text>
            </Button>

            {/* Email Button */}
            <Button
              variant="outline"
              width="full"
              mb={3}
              onClick={() => AuthActions.login('eth').then(() => navigate('/'))}
              leftIcon={
                <Box>
                  <EmailIcon size={22} />
                </Box>
              }
              className={styles.button}
            >
              <Text>{BUTTON_LABELS.signUpWithEmail}</Text>
            </Button>
          </VStack>
        </Box>
      </Center>
    </Flex>
  )
}

export default SignUpComponent
