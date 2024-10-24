//TODO: to make the local currency and the timezone there and then include the dark mode option here as dropdown
import React from 'react'
import { Flex, Box, Text, Button, Card, CardBody, Icon } from '@chakra-ui/react'
import CustomDropdown from '../addFilter/CustomDropdown'
import DropdownWithIcon from '../DropdownWithIcon'
import { CiDark, CiLight } from 'react-icons/ci'
import { IconType } from 'react-icons/lib'
import { RiTimeLine } from 'react-icons/ri'
import { FaGlobe } from 'react-icons/fa'
import { CgDarkMode } from 'react-icons/cg'

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

//format {}[] and ['','']

interface currencies {
  name: string
  symbol: IconType
}
;[]

const currencies: currencies[] = [
  { name: 'USD', symbol: FaDollarSign }, // US Dollar
  { name: 'Mexican Peso', symbol: FaDollarSign }, // Mexican Peso
  { name: 'CAD', symbol: FaCanadianMapleLeaf }, // Canadian Dollar
  { name: 'British Pound', symbol: FaPoundSign }, // British Pound
  { name: 'EURO', symbol: FaEuroSign }, // Euro
  { name: 'Rupee', symbol: FaRupeeSign }, // Indian Rupee
  { name: 'Japanese Yen', symbol: FaYenSign }, // Japanese Yen
  { name: 'AUD', symbol: FaAud }, // Australian Dollar
]

const timezones = [
  'GMT', // GMT+0
  'GMT+1', // GMT+1 (e.g., Central European Time - CET)
  'GMT+2', // GMT+2 (e.g., Eastern European Time - EET)
  'GMT+3', // GMT+3 (e.g., Arabia Standard Time - AST)
  'GMT+4', // GMT+4 (e.g., Gulf Standard Time - GST)
  'GMT+5', // GMT+5 (e.g., Pakistan Standard Time - PKT)
  'GMT+5:30', // GMT+5:30 (India Standard Time - IST)
  'GMT+6', // GMT+6 (Bangladesh Standard Time - BST)
  'GMT+7', // GMT+7 (Indochina Time - ICT)
  'GMT+8', // GMT+8 (China Standard Time - CST)
  'GMT+9', // GMT+9 (Japan Standard Time - JST)
  'GMT-5', // EST (Eastern Standard Time)
  'GMT-6', // CST (Central Standard Time)
  'GMT-7', // MST (Mountain Standard Time)
  'GMT-8', // PST (Pacific Standard Time)
]

const theme: currencies[] = [
  {
    name: 'dark',
    symbol: CiDark,
  },
  {
    name: 'light',
    symbol: CiLight,
  },
]
const Interface = (props: Props) => {
  return (
    <Card
      h={'70vh'}
      w="80%"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          flexDirection={'column'}
          gap={12}
          py={12}
        >
          <Box>
            <Flex
              alignItems={'center'}
              gap={48}
            >
              <Flex
                w={200}
                gap={3}
                alignItems={'center'}
              >
                <Icon
                  as={FaGlobe}
                  boxSize={'24px'}
                />
                <Text fontWeight={'bold'}>Local Currencies</Text>
              </Flex>
              <DropdownWithIcon options={currencies} />
            </Flex>
          </Box>
          <Box>
            <Flex
              alignItems={'center'}
              gap={48}
            >
              <Flex
                w={200}
                gap={3}
                alignItems={'center'}
              >
                <Icon
                  as={RiTimeLine}
                  boxSize={'24px'}
                />
                <Text fontWeight={'bold'}>Timezone </Text>
              </Flex>
              <CustomDropdown options={timezones} />
            </Flex>
          </Box>
          <Box>
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              gap={48}
            >
              <Flex
                w={200}
                alignItems={'center'}
                gap={3}
              >
                <Icon
                  as={CgDarkMode}
                  boxSize={'24px'}
                />
                <Text fontWeight={'bold'}>Theme</Text>
              </Flex>
              <DropdownWithIcon options={theme} />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Interface
