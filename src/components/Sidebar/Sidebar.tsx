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

const Sidebar = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const loc = useLocation()

  const { colorMode } = useColorMode()

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
            {/* TODO: to make changes here for the dark mode ` */}
            <Flex
              alignItems={'center'}
              gap={1}
              w={36}
              _hover={{
                bgColor: colorMode === 'light' ? '#f3f4f7' : 'gray.500',
              }}
              paddingX={2}
              paddingY={1}
              borderRadius={'sm'}
              //   color={loc.pathname === item.loc ? 'black' : '#75757d'}
              color={colorMode === 'dark' ? 'whitesmoke' : '#75757d'}
              //   bgColor={loc.pathname === item.loc ? '#75757d' : 'white'}
              bgColor={colorMode === 'dark' ? 'gray.700' : 'white'}
              fontWeight={loc.pathname === item.loc ? 480 : undefined}
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
              _hover={
                {
                  // bgColor: colorMode === 'light' ? '#f3f4f7' : 'gray.900',
                }
              }
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
                _hover={{
                  color: colorMode === 'light' ? 'black' : 'whitesmoke',
                }}
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
