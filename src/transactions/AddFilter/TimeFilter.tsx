import React from 'react'
import { Icon, Flex, Box, Input } from '@chakra-ui/react'
import { FaRegClock } from 'react-icons/fa'

type Props = {}

const TimeFilter = (props: Props) => {
  return (
    <Flex
      paddingY={2}
      alignItems={'center'}
    >
      <Flex
        width={'310px'}
        alignItems={'center'}
        gap={1}
      >
        <Input />
        <Icon
          as={FaRegClock}
          size={'xs'}
        />
        <Input />
      </Flex>
    </Flex>
  )
}

export default TimeFilter
