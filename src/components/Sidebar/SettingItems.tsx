import React, { ReactNode } from 'react'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GoHome } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { BsArrowLeft } from 'react-icons/bs'

type Props = {}

const SettingItems = (prop: Props) => {
  const loc = useLocation()
  const navigate = useNavigate()

  const settingItems = [
    {
      icon: <CgProfile />,
      text: 'Account Profile',
      loc: '/settings/account-profile',
      onClick: () => navigate('/settings/account-profile'),
    },
  ]

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        onClick={() => navigate('/')}
        cursor={'pointer'}
      >
        <Icon
          as={BsArrowLeft}
          width={5}
          height={5}
        />
        <Text fontWeight={'sm'}>Settings</Text>
      </Flex>
      {settingItems.map(item => (
        <Flex
          key={item.text}
          alignItems="center"
          justifyContent={'center'}
          onClick={item.onClick}
          pt={2}
        >
          <Flex
            alignItems={'center'}
            gap={1}
            w={36}
            paddingX={2}
            paddingY={1}
            borderRadius={'sm'}
            color={loc.pathname === item.loc ? 'black' : 'gray.900'}
            bgColor={loc.pathname === item.loc ? 'gray.50' : 'white'}
            fontWeight={loc.pathname === item.loc ? 480 : undefined}
            cursor={'pointer'}
          >
            <Text color={loc.pathname === item.loc ? 'indigo.900' : 'gray.800'}>
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
    </>
  )
}

export default SettingItems
