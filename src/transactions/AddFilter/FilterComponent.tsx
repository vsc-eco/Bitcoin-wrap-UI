import React from 'react'
import { Box, Flex, Input, Text, Icon } from '@chakra-ui/react'
import { GoDash } from 'react-icons/go'
import { monthDateToString, MonthDate } from './CalendarComponent'

type Props = {
  firstDate: MonthDate
  lastDate: MonthDate
}

const FilterComponent = ({ firstDate, lastDate }: Props) => {
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
          value={monthDateToString(firstDate)}
          mr={1}
        />
        <Icon
          as={GoDash}
          size={'xs'}
        />
        <Input
          value={monthDateToString(lastDate)}
          ml={1}
        />
      </Flex>
    </Box>
  )
}

export default FilterComponent
