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

const options = [
  {
    heading: 'Any',
  },
  {
    heading: 'In (e.g. deposits, refunds)',
  },
  {
    heading: 'Out (e.g. purchase, charges)',
  },
] as const

const amountOptions = [
  {
    title: 'Specific amount',
    icon: TiEquals,
  },
  {
    title: 'At least...',
    icon: LiaGreaterThanEqualSolid,
  },
  {
    title: 'No more than...',
    icon: LiaLessThanEqualSolid,
  },
] as const

const AmountSection = (props: Props) => {
  const [value, setValue] = useState<string>('')

  return (
    <Flex
      flexDirection="column"
      px={2}
      py={2}
      gap={4}
      height={500}
    >
      <Box>
        <Text>Direction</Text>
        <RadioGroup
          value={value}
          onChange={setValue}
        >
          {options.map((item, index) => (
            <Box key={index}>
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
        {amountOptions.map((item, index) => (
          <Box key={index}>
            <Text>{item.title}</Text>
            <Box position={'relative'}>
              <Input
                type="text"
                color={'gray.600'}
                px={14}
                placeholder="0.00"
              />
              <Box
                position="absolute"
                top={3}
                left={2}
              >
                <Flex
                  gap={3}
                  color={'cream.100'}
                  alignItems={'center'}
                >
                  <Icon as={item.icon} />
                  <Icon
                    as={FiDollarSign}
                    color={'gray.650'}
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
