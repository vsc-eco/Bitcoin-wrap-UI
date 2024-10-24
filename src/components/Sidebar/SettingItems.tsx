//TODO: local currency and the timezone as main components

import React, { useState } from 'react'
import { Flex, Box, Text, Icon, Collapse } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsArrowLeft } from 'react-icons/bs'

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
      icon: CgProfile,
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
            pt={2}
            onClick={item.onClick}
            cursor={'pointer'}
          >
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              w="100%"
              px={2}
              py={2}
              borderRadius={'sm'}
              bgColor={loc.pathname === item.loc ? 'gray.50' : 'white'}
              fontWeight={loc.pathname === item.loc ? 480 : undefined}
            >
              <Flex alignItems="center">
                <Icon as={item.icon} />
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

          {/* Currency Dropdown
          <Collapse in={showCurrency && item.text === 'Local Currency'}>
            <Box
              pl={6}
              pt={2}
            >
              {currencies.map((option, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  py={1}
                  cursor={'pointer'}
                  _hover={{ bgColor: 'gray.70' }}
                  onClick={() => setCurrency(option.name)}
                >
                  <Icon
                    as={option.symbol}
                    mr={2}
                  />
                  <Text>{option.name}</Text>
                </Flex>
              ))}
            </Box>
          </Collapse> */}

          {/* Timezone Dropdown */}
          {/* <Collapse in={showTimeZone && item.text === 'Timezone'}>
            <Box
              pl={6}
              pt={2}
            >
              {timezones.map((option, index) => (
                <Text
                  key={index}
                  py={1}
                  cursor={'pointer'}
                  _hover={{ bgColor: 'gray.70' }}
                  onClick={() => setTimeZone(option)}
                >
                  {option}
                </Text>
              ))}
            </Box>
          </Collapse> */}
        </Box>
      ))}
    </>
  )
}

export default SettingItems
