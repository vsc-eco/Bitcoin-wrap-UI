import React, { useState } from 'react'
import {
  Flex,
  Box,
  Text,
  RadioGroup,
  Radio,
  Icon,
  Input,
} from '@chakra-ui/react'
import { TiEquals } from 'react-icons/ti'
import {
  LiaGreaterThanEqualSolid,
  LiaLessThanEqualSolid,
} from 'react-icons/lia'
import { FiDollarSign } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'
import { iteratorStream } from '@hiveio/dhive/lib/utils'

type Props = {}

type optionsType = {
  id: number
  title: string
  icon: IconType
}[]

const options = [
  {
    id: 1,
    heading: 'Any',
  },
  {
    id: 2,
    heading: 'In (e.g. deposits, refunds)',
  },
  {
    id: 3,
    heading: 'Out (e.g. purchase, charges)',
  },
]

const options2: optionsType = [
  {
    id: 1,
    title: 'Specific amount',
    icon: TiEquals,
  },
  {
    id: 2,
    title: 'At least...',
    icon: LiaGreaterThanEqualSolid,
  },
  {
    id: 3,
    title: 'No more than...',
    icon: LiaLessThanEqualSolid,
  },
]

//TODO: darker the color of the dollar sign icon when its focused the input and cursor is there

const AmountSection = (props: Props) => {
  const [value, setValue] = useState<string>('')

  return (
    <Flex
      flexDirection="column"
      px={2}
      py={2}
      gap={4}
    >
      <Box>
        <Text>Direction</Text>
        <RadioGroup
          value={value}
          onChange={setValue}
        >
          {options.map(item => (
            <Box key={item.id}>
              <Radio value={item.heading}>
                <Text>{item.heading}</Text>
              </Radio>
            </Box>
          ))}
        </RadioGroup>
      </Box>

      <Flex
        flexDirection={'column'}
        gap={4}
        py={2}
      >
        {options2.map(item => (
          <Box key={item.id}>
            <Text>{item.title}</Text>
            <Box position={'relative'}>
              <Input
                type="text"
                px={12}
                placeholder="0.00"
              />
              <Box
                position="absolute"
                top={3}
                left={2}
              >
                <Flex
                  gap={3}
                  color={'#dadade'}
                  alignItems={'center'}
                >
                  <Icon as={item.icon} />
                  <Icon
                    as={FiDollarSign}
                    color={'#dadade'}
                    _focusWithin={{ color: 'black' }}
                  />
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

export default AmountSection
