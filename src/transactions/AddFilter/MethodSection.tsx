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

const MethodSection = (props: Props) => {
  const options = [
    {
      id: 1,
      title: 'Deposit',
      icon: RiLuggageDepositLine,
    },
    {
      id: 2,
      title: 'Transfer',
      icon: BiTransferAlt,
    },
    {
      id: 3,
      title: 'Withdrawl',
      icon: BiMoneyWithdraw,
    },
  ]
  return (
    <Flex
      justifyContent={'center'}
      paddingTop={'36px'}
      paddingLeft={'8px'}
      height={500}
    >
      <Flex direction={'column'}>
        <Text>This is the method section</Text>
        <Box>
          <CheckboxGroup>
            {options.map(item => (
              <Box key={item.id}>
                <Button
                  w={'full'}
                  justifyContent={'start'}
                  my={2}
                >
                  <Checkbox>
                    <Flex
                      gap={2}
                      alignItems={'center'}
                    >
                      <Icon as={item.icon} />
                      <Text>{item.title}</Text>
                    </Flex>
                  </Checkbox>
                </Button>
              </Box>
            ))}
          </CheckboxGroup>
        </Box>
      </Flex>
    </Flex>
  )
}

export default MethodSection
