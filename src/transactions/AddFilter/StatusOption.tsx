import React, { useState } from 'react'
import { Flex, Box, CheckboxGroup, Checkbox, Button } from '@chakra-ui/react'

type Props = {}

const options = [
  {
    name: 'Confirmed',
  },
  {
    name: 'Pending',
  },
  {
    name: 'Failed',
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
            </Box>
          ))}
        </CheckboxGroup>
      </Box>
    </Flex>
  )
}
export default StatusOption
