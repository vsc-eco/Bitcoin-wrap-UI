import React, { useState } from 'react'
import { Icon, Flex, Box, Input, Text } from '@chakra-ui/react'
import { FaRegClock } from 'react-icons/fa'
import { GoDash } from 'react-icons/go'
import moment from 'moment'

type Props = {}

const TimeFilter = (props: Props) => {
  const [fromTime, setFromTime] = useState<string>('00:00')
  const [toTime, setToTime] = useState<string>('23:59')

  const formatTo24Hour = (time: string) => {
    // Converts 12-hour format to 24-hour format
    const [timePart, modifier] = time.split(' ')
    let [hours, minutes] = timePart.split(':')
    let formattedHour = parseInt(hours)

    if (modifier === 'PM') {
      formattedHour += 12
    }

    return `${formattedHour}:${minutes}`
  }

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
          onChange={e => {
            const formatted24HourTime = formatTo24Hour(e.target.value)
            setFromTime(formatted24HourTime)
          }}
          mr={1}
          step={60}
        />
        <Icon
          as={GoDash}
          boxSize={4}
        />
        <Input
          type="time"
          value={toTime}
          onChange={e => {
            const formatted24HourTime = formatTo24Hour(e.target.value)
            setToTime(formatted24HourTime)
          }}
          ml={1}
          step={60}
        />
      </Flex>
    </Box>
  )
}

export default TimeFilter
