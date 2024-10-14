//TODO: to replace the sidebar items in the settings
import React, { useState } from 'react'
import { VStack, Flex } from '@chakra-ui/react'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { CgProfile } from 'react-icons/cg'
import { CiMenuBurger } from 'react-icons/ci'
import { BsCoin } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import LogoComponent from '../Logo/LogoComponent'
import { useNavigate, useLocation, Route, Routes, Link } from 'react-router-dom'
import HomeItems from './HomeItems'
import BottomItems from './BottomItems'
import { iterateObserversSafely } from '@apollo/client/utilities'
import SettingItems from './SettingItems'

const Sidebar = () => {
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
      width={300}
      paddingY="10px"
      position="relative"
      _dark={{
        boxShadow: '0px 1px 3px 0px gray.600',
      }}
    >
      <Flex
        bg="gray.50"
        px={2}
        py={2}
        boxShadow="0px 1px 0px #ECEEF2"
        _hover={{
          backgroundColor: 'gray.70',
        }}
      >
        <LogoComponent />
      </Flex>

      <VStack
        paddingX={'20px'}
        align="start"
        w={200}
      >
        <Routes>
          <Route
            path="/settings/:page?"
            Component={() => (
              <>
                <SettingItems />
              </>
            )}
          />
          <Route
            path="/:page?"
            Component={() => (
              <>
                {menuItems.map(item => (
                  <HomeItems
                    item={item}
                    key={item.text}
                  />
                ))}
              </>
            )}
          />
        </Routes>
        {/* For the bottom component  */}
        <BottomItems />
      </VStack>
    </Flex>
  )
}

export default Sidebar
