import React, { useState } from 'react'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsArrowLeft } from 'react-icons/bs'
import { MdCurrencyExchange, MdOutlineExpandMore } from 'react-icons/md'
import { RiTimeLine } from 'react-icons/ri'
import {
  FaDollarSign,
  FaCanadianMapleLeaf,
  FaPoundSign,
  FaEuroSign,
  FaRupeeSign,
  FaYenSign,
  FaDollarSign as FaAud,
} from 'react-icons/fa'

type Props = {}

const SettingItems = (prop: Props) => {
  const loc = useLocation()
  const navigate = useNavigate()

  const currencies = [
    { name: 'USD', symbol: FaDollarSign }, // US Dollar
    { name: 'Mexican Peso', symbol: FaDollarSign }, // Mexican Peso
    { name: 'CAD', symbol: FaCanadianMapleLeaf }, // Canadian Dollar
    { name: 'British Pound', symbol: FaPoundSign }, // British Pound
    { name: 'EURO', symbol: FaEuroSign }, // Euro
    { name: 'Rupee', symbol: FaRupeeSign }, // Indian Rupee
    { name: 'Japanese Yen', symbol: FaYenSign }, // Japanese Yen
    { name: 'AUD', symbol: FaAud }, // Australian Dollar
  ]

  const timezones = ['GMT', 'EST', 'CST', 'MST', 'PST', 'IST', 'JST']

  const [showCurrency, setShowCurrency] = useState(false)
  const [showTimeZone, setShowTimeZone] = useState(false)

  const settingItems = [
    {
      icon: <CgProfile />,
      text: 'Account Profile',
      loc: '/settings/account-profile',
      onClick: () => navigate('/settings/account-profile'),
    },
    {
      icon: <MdCurrencyExchange />,
      text: 'Local Currency',
      loc: '/settings/localCurrency',
      onClick: () => navigate('/settings/localCurrency'),
    },
    {
      icon: <RiTimeLine />,
      text: 'Timezone',
      loc: '/settings/timezone',
      onClick: () => navigate('/settings/timezone'),
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
          pt={2}
        >
          <Flex
            justifyContent={'space-between'}
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
            <Flex onClick={item.onClick}>
              <Text
                color={loc.pathname === item.loc ? 'indigo.900' : 'gray.800'}
              >
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

            {item.text !== 'Account Profile' && (
              <Icon
                as={MdOutlineExpandMore}
                boxSize={'12px'}
                onClick={() => {
                  if (item.text === 'Local Currency') {
                    setShowCurrency(!showCurrency)
                    setShowTimeZone(false) // Close timezone dropdown if open
                  } else if (item.text === 'Timezone') {
                    setShowTimeZone(!showTimeZone)
                    setShowCurrency(false) // Close currency dropdown if open
                  }
                }}
              />
            )}
          </Flex>

          {showCurrency && item.text === 'Local Currency' && (
            <Box pt={2}>
              {currencies.map((option, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={option.symbol} />
                  <Text>{option.name}</Text>
                </Flex>
              ))}
            </Box>
          )}

          {showTimeZone && item.text === 'Timezone' && (
            <Box pt={2}>
              {timezones.map((option, index) => (
                <Text key={index}>{option}</Text>
              ))}
            </Box>
          )}
        </Flex>
      ))}
    </>
  )
}

export default SettingItems
