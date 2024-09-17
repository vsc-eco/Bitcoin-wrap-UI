import React, { useState } from 'react'
import { Icon, Flex, Box, Input, Text } from '@chakra-ui/react'
import { FaRegClock } from 'react-icons/fa'
import { GoDash } from 'react-icons/go'

type Props = {}

const TimeFilter = (props: Props) => {
  const [fromTime, setFromTime] = useState<string>('')
  const [toTime, setToTime] = useState<string>('')

  return (
    <Box>
      <Flex
        gap={36}
        pt={4}
      >
        <Text
          mb={2}
          fontSize={'sm'}
        >
          From
        </Text>
        <Text
          mb={2}
          fontSize={'sm'}
        >
          To
        </Text>
      </Flex>
      <Flex
        width={'310px'}
        alignItems={'center'}
      >
        <Input
          type="time"
          value={fromTime}
          onChange={e => setFromTime(e.target.value)}
          mr={1}
        />
        <Icon
          as={GoDash}
          size={'xs'}
        />
        <Input
          type="time"
          value={toTime}
          onChange={e => setToTime(e.target.value)}
          ml={1}
        />
      </Flex>
    </Box>
  )
}

export default TimeFilter
