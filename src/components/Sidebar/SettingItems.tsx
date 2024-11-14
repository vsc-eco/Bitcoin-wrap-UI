import React, { useEffect, useRef, useState } from 'react'
import { Flex, Box, Text, Icon, Collapse } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsArrowLeft } from 'react-icons/bs'
import { BsWindowFullscreen } from 'react-icons/bs'

type Props = {}

const SettingItems: React.FC<Props> = () => {
  const loc = useLocation()
  const navigate = useNavigate()

  const settingItems = [
    {
      icon: CgProfile,
      text: 'Account Profile',
      loc: '/settings/account-profile',
      onClick: () => navigate('/settings/account-profile'),
    },
    {
      icon: BsWindowFullscreen,
      text: 'Interface',
      loc: '/settings/interface',
      onClick: () => navigate('/settings/interface'),
    },
  ]

  function setCurrency(item: string) {
    localStorage.setItem('Currency', item)
  }

  function setTimeZone(item: string) {
    localStorage.setItem('Timezone', item)
  }

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        onClick={() => navigate('/')}
        cursor={'pointer'}
        mb={4} // Added margin bottom for spacing
      >
        <Icon
          as={BsArrowLeft}
          width={5}
          height={5}
        />
        <Text fontWeight={'sm'}>Settings</Text>
      </Flex>
      {settingItems.map(item => (
        <Box
          key={item.text}
          width="100%"
        >
          <Flex
            alignItems="center"
            justifyContent={'space-between'}
            onClick={item.onClick}
            cursor={'pointer'}
          >
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              w="100%"
              px={2}
              py={1}
              borderRadius={'sm'}
              bgColor={loc.pathname === item.loc ? 'gray.50' : 'white'}
              fontWeight={loc.pathname === item.loc ? 480 : undefined}
            >
              <Flex alignItems="center">
                <Icon
                  as={item.icon}
                  boxSize={item.text === 'Interface' ? '20px' : '22px'}
                />
                <Text
                  ml={2}
                  fontSize="sm"
                  color="gray.800"
                >
                  {item.text}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  )
}

export default SettingItems
