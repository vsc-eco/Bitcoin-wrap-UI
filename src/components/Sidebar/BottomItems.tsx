import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { ToggleDarkModeButton } from '../ToggleDarkModeButton'
import { BiSolidLogInCircle } from 'react-icons/bi'
import { UserInfo } from './UserInfo'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

type Props = {}

const BottomItems = (props: Props) => {
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <Box
      marginX="10px"
      position={'absolute'}
      bottom={'12px'}
      width={'100%'}
    >
      {/* <Flex px={6}>
        <ToggleDarkModeButton />
      </Flex> */}
      {auth.authenticated ? (
        <UserInfo userId={auth.userId} />
      ) : (
        <Flex
          alignItems="center"
          _dark={{
            _hover: {
              backgroundColor: '',
            },
          }}
          w={36}
          px={2}
          py={1}
        >
          <BiSolidLogInCircle
            size={'18px'}
            color={'gray.800'}
          />
          <Text
            ml={1}
            fontSize="xs"
            fontWeight="regular"
            onClick={() => navigate('/signup')}
            cursor={'pointer'}
            color={'gray.800'}
          >
            Sign in
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default BottomItems
