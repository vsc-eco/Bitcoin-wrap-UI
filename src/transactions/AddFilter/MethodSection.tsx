import React from 'react'
import {
  Flex,
  Box,
  Text,
  Checkbox,
  CheckboxGroup,
  Button,
  Icon,
} from '@chakra-ui/react'
import { RiLuggageDepositLine } from 'react-icons/ri'
import { BiTransferAlt } from 'react-icons/bi'
import { BiMoneyWithdraw } from 'react-icons/bi'

type Props = {}

const options = [
  {
    title: 'Deposit',
    icon: RiLuggageDepositLine,
  },
  {
    title: 'Transfer',
    icon: BiTransferAlt,
  },
  {
    title: 'Withdrawl',
    icon: BiMoneyWithdraw,
  },
] as const
const MethodSection = (props: Props) => {
  return (
    <Flex
      paddingTop={'36px'}
      paddingLeft={'8px'}
      height={500}
    >
      <Flex direction={'column'}>
        <Box>
          <CheckboxGroup>
            {options.map((item, index) => (
              <Box
                key={index}
                my={2}
              >
                <Checkbox>
                  <Flex
                    gap={2}
                    alignItems={'center'}
                  >
                    <Icon as={item.icon} />
                    <Text fontFamily={'font-arcadia, system-ui, sans-serif'}>
                      {item.title}
                    </Text>
                  </Flex>
                </Checkbox>
              </Box>
            ))}
          </CheckboxGroup>
        </Box>
      </Flex>
    </Flex>
  )
}

export default MethodSection
