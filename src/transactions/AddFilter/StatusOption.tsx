import React, { useState } from 'react'
import { Flex, Box, CheckboxGroup, Checkbox, Button } from '@chakra-ui/react'

type Props = {}
//TODO: remove the button and have HIVE check

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
      width={'65%'}
      height={500}
      pt={'36px'}
      justifyContent={'center'}
      paddingLeft={'8px'}
    >
      <Box>
        <CheckboxGroup>
          {options.map((item, index) => (
            <Box
              key={index}
              my={2}
              mx={4}
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
