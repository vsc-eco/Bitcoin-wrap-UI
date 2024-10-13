import React, { useState } from 'react'
import { Flex, Box, Text, Icon, Collapse } from '@chakra-ui/react'
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

const SettingItems: React.FC<Props> = () => {
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
      icon: CgProfile,
      text: 'Account Profile',
      loc: '/settings/account-profile',
      onClick: () => navigate('/settings/account-profile'),
    },
    {
      icon: MdCurrencyExchange,
      text: 'Local Currency',
      loc: '/settings/localCurrency',
      onClick: () => navigate('/settings/localCurrency'),
    },
    {
      icon: RiTimeLine,
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
              {item.text !== 'Account Profile' && (
                <Icon
                  as={MdOutlineExpandMore}
                  boxSize={'18px'}
                  onClick={e => {
                    e.stopPropagation() // Prevent navigation on toggle click
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
          </Flex>

          {/* Currency Dropdown */}
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
                >
                  <Icon
                    as={option.symbol}
                    mr={2}
                  />
                  <Text>{option.name}</Text>
                </Flex>
              ))}
            </Box>
          </Collapse>

          {/* Timezone Dropdown */}
          <Collapse in={showTimeZone && item.text === 'Timezone'}>
            <Box
              pl={6}
              pt={2}
            >
              {timezones.map((option, index) => (
                <Text
                  key={index}
                  py={1}
                >
                  {option}
                </Text>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </>
  )
}

export default SettingItems
