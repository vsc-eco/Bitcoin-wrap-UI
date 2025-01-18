import React, { useState } from 'react'
import { Flex, Box, CheckboxGroup, Checkbox, Button } from '@chakra-ui/react'

type Props = {}

const options = [
  {
    name: 'Confirmed',
    subtext: `Transaction has been confirmed and successfully completed.`,
  },
  {
    name: 'Pending',
    subtext: 'Transaction is pending and has not been confirmed yet.',
  },
  {
    name: 'Failed',
    subtext: `Transaction has failed <learn more>`,
  },
] as const
const StatusOption = (props: Props) => {
  return (
    <Flex
      pt={'36px'}
      height={500}
      paddingLeft={'8px'}
    >
      <Box>
        <CheckboxGroup>
          {options.map((item, index) => (
            <Box
              key={index}
              my={2}
            >
              <Checkbox value={item.name}>{item.name}</Checkbox>
              <p style={{ fontSize: '12px' }}>{item.subtext} </p>
            </Box>
          ))}
        </CheckboxGroup>
      </Box>
    </Flex>
  )
}
export default StatusOption
