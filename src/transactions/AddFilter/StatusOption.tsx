import React, { useState } from 'react'
import { Flex, Box, Radio, RadioGroup } from '@chakra-ui/react'

type Props = {}

const StatusOption = (props: Props) => {
  const [value, setValue] = useState<string>(' ')

  const options = [
    {
      id: 1,
      name: 'Confirmed',
    },
    {
      id: 2,
      name: 'Pending',
    },
    {
      id: 3,
      name: 'Failed',
    },
  ]

  return (
    <Flex
      width={'65%'}
      height={500}
      pt={12}
      paddingLeft={'8px'}
    >
      <Box>
        <RadioGroup
          onChange={setValue}
          value={value}
        >
          {options.map(item => (
            <Box key={item.id}>
              <Radio
                colorScheme={
                  item.name === 'pending'
                    ? 'yellow'
                    : 'confirmed'
                      ? 'green'
                      : 'red'
                }
                value={item.name}
              >
                {item.name}
              </Radio>
            </Box>
          ))}
        </RadioGroup>
      </Box>
    </Flex>
  )
}
export default StatusOption
