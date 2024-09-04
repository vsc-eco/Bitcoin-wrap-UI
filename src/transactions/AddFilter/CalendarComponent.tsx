import React, { useState } from 'react'
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Grid,
  Icon,
  Select,
} from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { GoDash } from 'react-icons/go'

type MonthDate = {
  year: number
  month: number
  day: number
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const monthDateToString = (d: MonthDate) => {
  return `${months[d.month]} ${d.day + 1}, ${d.year}`
}

const lastDayOfMonth = (month: number, year: number) =>
  month === 1
    ? year % 4 === 0 && year % 1000 !== 0
      ? 29
      : 28
    : month % 2 === (month < 7 ? 0 : 1)
      ? 31
      : 30

type Props = {}
const CalendarComponent = (props: Props) => {
  //default
  const currentDate = new Date()
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear(),
  )
  const [firstDate, setFirstDate] = useState<MonthDate>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: 0,
  })
  const [lastDate, setLastDate] = useState<MonthDate>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: lastDayOfMonth(firstDate.month, firstDate.year) - 1,
  })
  const [firstSelected, setFirstSelected] = useState(false)
  const [secondSelected, setSecondSelected] = useState(false)
  const [hoveredDate, setHoveredDate] = useState<MonthDate>()

  const handleMonthSelect = (month: number, year: number) => {
    if (!firstSelected || secondSelected) {
      setFirstDate({
        year,
        month,
        day: 0,
      })
      setLastDate({
        year,
        month,
        day: lastDayOfMonth(month, year) - 1,
      })
      setFirstSelected(true)
      setSecondSelected(false)
    } else {
      // first date is after the 2nd selected date
      if (
        firstDate.year > year ||
        (firstDate.year === year && firstDate.month >= month)
      ) {
        setFirstDate({
          year,
          month,
          day: 0,
        })
        setLastDate({
          year,
          month,
          day: lastDayOfMonth(month, year) - 1,
        })
      } else {
        setLastDate({
          year,
          month,
          day: lastDayOfMonth(month, year) - 1,
        })
        setSecondSelected(true)
      }
    }
  }

  const getDateClass = (monthIndex: number) => {
    return ''
  }

  function handleHoverDate(month: number, year: number): void {
    setHoveredDate({ month, year, day: lastDayOfMonth(month, year) - 1 })
  }

  // firstDate: MonthDate, firstSelected: boolean, hoveredDate: MonthDate | undefined
  function selectorButtonBackground(
    month: number,
    year: number,
  ):
    | import('@chakra-ui/styled-system').ResponsiveValue<
        import('csstype').Property.Color
      >
    | undefined {
    //edge case
    if (firstSelected && month === firstDate.month && year === firstDate.year) {
      // dark selected
      return '#e3e6fc'
    }
    // TODO second date might look weird
    if (!hoveredDate) {
      // default
      return undefined
    }

    if (firstSelected) {
      // firstDate is after this date
      if (
        firstDate.year > year ||
        (firstDate.year === year && firstDate.month > month)
      ) {
        return undefined
      } else if (secondSelected) {
        if (
          lastDate.year > year ||
          (lastDate.year === year && lastDate.month > month)
        ) {
          return '#e3e6fc'
        } else if (lastDate.year === year && lastDate.month === month) {
          // dark selected
          return '#e3e6fc'
        } else {
          return undefined
        }
      } else if (
        hoveredDate.year > year ||
        (hoveredDate.year === year && hoveredDate.month > month)
      ) {
        return '#e3e6fc'
      } else if (hoveredDate.year === year && hoveredDate.month === month) {
        // dark selected
        return ''
      } else {
        // light selected
        return undefined
      }
    } else {
      if (hoveredDate.year === year && hoveredDate.month === month) {
        // light selected
        return 'gray.400'
      }
    }
  }

  //function for handling the first date
  // const handleFirstDateChange = (event) => {
  //     const newDate = monthDateToString(event.target.value);
  //     setFirstDate(newDate)
  // }

  // const handleLastDateChange = (event) => {
  //     const newDate = monthDateToString(event.target.value);
  //     setLastDate(newDate)
  // }
  return (
    <>
      <Flex
        direction="column"
        width={'65%'}
        justifyContent={'center'}
        paddingLeft={'8px'}
      >
        <Box
          boxShadow={'0px 1px 0px #f0f1f4'}
          paddingX={'2px'}
          paddingY={'12px'}
        >
          <Text
            fontSize={'12px'}
            paddingTop={'12px'}
            paddingLeft={'4px'}
          >
            Show transactions for
          </Text>
          <Select
            placeholder="Custom"
            w="300px"
            variant={'filled'}
          >
            <option value="this-month">This month</option>
            <option value="last-month">Last month</option>
          </Select>
        </Box>
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
        <Flex
          gap={6}
          pt={12}
          pb={4}
          pr={2}
        >
          <Box>
            <Flex
              alignItems={'center'}
              gap={12}
            >
              <Icon
                as={FaArrowLeft}
                fontSize={'12px'}
                color={'#73737a'}
                _hover={{ color: 'indigo.900' }}
                cursor={'pointer'}
                onClick={() => setCurrentYear(prev => prev - 1)}
              />
              <Text fontSize={'12px'}>{currentYear - 1}</Text>
            </Flex>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={2}
              py={2}
            >
              {months.map((month, index) => (
                <Button
                  key={month}
                  onClick={() => handleMonthSelect(index, currentYear - 1)}
                  className={`${getDateClass(index)}`}
                  onMouseOver={() => handleHoverDate(index, currentYear - 1)}
                  bgColor={selectorButtonBackground(index, currentYear - 1)}
                  size={'xs'}
                  _hover={{
                    bgColor: undefined,
                  }}
                >
                  <Text
                    color={'rgb(54, 54, 68)'}
                    fontWeight={400}
                    fontSize={'14px'}
                    lineHeight={'20px'}
                  >
                    {month}
                  </Text>
                </Button>
              ))}
            </Grid>
          </Box>
          <Box>
            <Flex
              justify={
                currentYear < currentDate.getFullYear() ? 'end' : 'center'
              }
              gap={12}
            >
              <Text fontSize={'12px'}>{currentYear}</Text>
              {currentYear < currentDate.getFullYear() && (
                <Icon
                  as={FaArrowRight}
                  fontSize={'12px'}
                  color={'#73737a'}
                  _hover={{ color: 'indigo.900' }}
                  cursor={'pointer'}
                  onClick={() => setCurrentYear(prev => prev + 1)}
                />
              )}
            </Flex>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={2}
              py={2}
            >
              {months.map((month, index) => (
                <Button
                  key={month}
                  onClick={() => handleMonthSelect(index, currentYear)}
                  onMouseOver={() => handleHoverDate(index, currentYear)}
                  bgColor={selectorButtonBackground(index, currentYear)}
                  size={'xs'}
                  _hover={{
                    bgColor: undefined,
                  }}
                >
                  <Text
                    color={'rgb(54, 54, 68)'}
                    fontWeight={400}
                    fontSize={'14px'}
                    lineHeight={'20px'}
                  >
                    {month}
                  </Text>
                </Button>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default CalendarComponent
