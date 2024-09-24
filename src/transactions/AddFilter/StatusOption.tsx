import React, { useState } from 'react'
import { Flex, Box, Radio, RadioGroup, Button } from '@chakra-ui/react'

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
  const [value, setValue] = useState<string>(' ')

  return (
    <Flex
      width={'65%'}
      height={500}
      pt={'36px'}
      justifyContent={'center'}
      paddingLeft={'8px'}
    >
      <Box>
        <RadioGroup
          onChange={setValue}
          value={value}
        >
          {options.map((item, index) => (
            <Box
              key={index}
              my={2}
              mx={4}
            >
              <Button
                size={'sm'}
                w="full"
                textAlign={'left'}
                justifyContent={'start'}
              >
                <Radio
                  colorScheme={
                    item.name === 'Pending'
                      ? 'yellow'
                      : item.name === 'Confirmed'
                        ? 'green'
                        : 'red'
                  }
                  value={item.name}
                >
                  {item.name}
                </Radio>
              </Button>
            </Box>
          ))}
        </RadioGroup>
      </Box>
    </Flex>
  )
}
export default StatusOption
