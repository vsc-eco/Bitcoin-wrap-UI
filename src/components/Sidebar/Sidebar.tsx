import React, { useState } from 'react'
import { Box, VStack, Text, Flex, Button } from '@chakra-ui/react'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { CiMenuBurger } from 'react-icons/ci'
import { BsCoin } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { BiSolidLogInCircle } from 'react-icons/bi'
import LogoComponent from '../Logo/LogoComponent'
import { useAuth } from '../../hooks/auth'
import { UserInfo } from './UserInfo'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToggleDarkModeButton } from '../ToggleDarkModeButton'
import { useColorMode } from '@chakra-ui/react'

//TODO: to all the
const Sidebar = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const loc = useLocation()

  const menuItems = [
    {
      icon: <GoHome />,
      text: 'Home',
      loc: '/',
      onClick: () => navigate('/'),
    },
    {
      icon: <LiaExchangeAltSolid />,
      text: 'Wrap',
      loc: '/exchange',
      onClick: () => navigate('/exchange'),
    },
    {
      icon: <BsCoin />,
      text: 'Dex',
      loc: '/dex',
      onClick: () => navigate('/dex'),
    },
    {
      icon: <CiMenuBurger />,
      text: 'Transactions',
      loc: '/transaction',
      onClick: () => navigate('/transaction'),
    },
  ]

  return (
    <Flex
      flexDirection={'column'}
      gap={5}
      boxShadow="base"
      paddingY="10px"
      paddingX={'20px'}
      position="relative"
      //  bgColor={useColorMode}
    >
      <LogoComponent />
      <VStack
        align="start"
        w="auto"
      >
        {menuItems.map(item => (
          <Flex
            key={item.text}
            alignItems="center"
            justifyContent={'center'}
            onClick={item.onClick}
          >
            <Flex
              alignItems={'center'}
              gap={1}
              w={36}
              _hover={{ bgColor: '#f3f4f7' }}
              paddingX={2}
              paddingY={1}
              borderRadius={'sm'}
              color={loc.pathname === item.loc ? 'black' : '#75757d'}
              fontWeight={loc.pathname === item.loc ? 480 : undefined}
              bgColor={loc.pathname === item.loc ? '#f3f4f7' : 'white'}
              cursor={'pointer'}
            >
              <Text color={loc.pathname === item.loc ? '#7b8aee' : '#75757d'}>
                {item.icon}
              </Text>
              <Text
                ml={1}
                fontSize="xs"
                cursor={'pointer'}
              >
                {item.text}
              </Text>
            </Flex>
          </Flex>
        ))}
        <Box
          marginX="10px"
          position={'absolute'}
          bottom={'12px'}
          width={'100%'}
        >
          <Flex px={6}>
            <ToggleDarkModeButton />
          </Flex>
          {auth.authenticated ? (
            <UserInfo userId={auth.userId} />
          ) : (
            <Flex
              alignItems="center"
              _hover={{ bgColor: '#f3f4f7', color: 'black' }}
              w={36}
              px={2}
              py={1}
            >
              <BiSolidLogInCircle
                size={'18px'}
                color={'#75757d'}
              />
              <Text
                ml={1}
                fontSize="xs"
                fontWeight="regular"
                onClick={() => navigate('/signup')}
                cursor={'pointer'}
                color={'#75757d'}
                _hover={{ color: 'black' }}
              >
                Sign in
              </Text>
            </Flex>
          )}
        </Box>
      </VStack>
    </Flex>
  )
}

export default Sidebar
