import React from 'react'
import {
  Flex,
  Center,
  Box,
  Button,
  Image,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { FaEthereum, FaGithub, FaDiscord } from 'react-icons/fa'
import { BiLogoGmail } from 'react-icons/bi'
import { PiGoogleChromeLogoBold } from 'react-icons/pi'
import { BUTTON_LABELS } from '../../constants'
import HiveModal from './Hive/HiveModal'
import MetaMaskModal from './Ethereum/MetamaskModal'
import SocialPopUp from './SocialLinks/SocialPopUp'
import { AuthActions, useAuth } from '../../hooks/auth'
import { useNavigate } from 'react-router-dom'

const MultipleIcons = ({ size }) => {
  return (
    <Flex>
      <Flex px={2}>
        <PiGoogleChromeLogoBold fontSize={size} />
      </Flex>
      <Flex px={2}>
        <FaDiscord fontSize={size} />
      </Flex>
      <Flex px={2}>
        <FaGithub fontSize={size} />
      </Flex>
    </Flex>
  )
}

const EmailIcon = ({ size }) => (
  <Flex>
    <Flex px={2}>
      <BiLogoGmail fontSize={size} />
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
            src="/VSC-Logo.png"
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
            >
              {BUTTON_LABELS.signInWithHive}
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
              leftIcon={<FaEthereum fontSize={'20px'} />}
              onClick={() => AuthActions.login('eth').then(() => navigate('/'))}
            >
              {BUTTON_LABELS.signUpWithEth}
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
            >
              {BUTTON_LABELS.signUpWithSocials}
            </Button>

            {/* Email Button */}
            <Button
              variant="outline"
              width="full"
              mb={3}
              onClick={() => AuthActions.login('eth').then(() => navigate('/'))}
              rightIcon={
                <Box>
                  <EmailIcon size={22} />
                </Box>
              }
            >
              {BUTTON_LABELS.signUpWithEmail}
            </Button>
          </VStack>
        </Box>
      </Center>
    </Flex>
  )
}

export default SignUpComponent
