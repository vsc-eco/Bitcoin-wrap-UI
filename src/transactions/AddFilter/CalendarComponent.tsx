//TODO: add user input validation

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
import TimeFilter from './TimeFilter'
import FilterComponent from './FilterComponent'
import CustomDropdown from '../../components/addFilter/CustomDropdown'

type Props = {}
export type MonthDate = {
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

export const monthDateToString = (d: MonthDate) => {
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

const options = [
  'Last 30 days',
  'This month',
  'Last month',
  'This Quarter (Q3, 2024)',
  'Last Quarter (Q2, 2024)',
  '2 Quarters ago (Q1, 2024)',
  '3 Quarters ago (Q4, 2024)',
  'Last 6 months',
  'This  Year',
  'Last Year',
]

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
    isExternal: boolean = false,
  ):
    | import('@chakra-ui/styled-system').ResponsiveValue<
        import('csstype').Property.Color
      >
    | undefined {
    //edge case
    if (
      !isExternal &&
      firstSelected &&
      month === firstDate.month &&
      year === firstDate.year
    ) {
      // dark selected
      return 'cream.200'
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
          return 'cream.150'
        } else if (lastDate.year === year && lastDate.month === month) {
          if (isExternal) {
            return 'cream.150'
          }
          // dark selected
          return 'cream.200'
        } else {
          return undefined
        }
      } else if (
        hoveredDate.year > year ||
        (hoveredDate.year === year && hoveredDate.month > month)
      ) {
        return 'cream.150'
      } else if (
        !isExternal &&
        hoveredDate.year === year &&
        hoveredDate.month === month
      ) {
        // dark selected
        return ''
      } else {
        // light selected
        return undefined
      }
    } else {
      if (hoveredDate.year === year && hoveredDate.month === month) {
        // light selected
        return 'gray.50'
      }
    }
  }

  function selectorButtonStartBorderRadius(month: number, year: number) {
    if (firstSelected && month === firstDate.month && year === firstDate.year) {
      // dark selected
      return '8px'
    }
    return undefined
  }

  function selectorButtonEndBorderRadius(month: number, year: number) {
    if (
      firstSelected &&
      secondSelected &&
      lastDate.year === year &&
      lastDate.month === month
    ) {
      return '8px'
    }
    return undefined
  }
  return (
    <>
      <Flex
        direction="column"
        height={500}
        justifyContent={'center'}
        paddingLeft={'8px'}
      >
        <Box
          w="full"
          boxShadow={'0px 1px 0px cream.100'}
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

          <CustomDropdown options={options} />
        </Box>
        <Box pl={2}>
          {/* first filter component  */}
          <FilterComponent
            firstDate={firstDate}
            lastDate={lastDate}
          />

          {/* second filter component  */}
          <TimeFilter />
        </Box>
        <Flex
          gap={6}
          pt={6}
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
                color={'gray.700'}
                _hover={{ color: 'indigo.900' }}
                cursor={'pointer'}
                onClick={() => setCurrentYear(prev => prev - 1)}
              />
              <Text fontSize={'12px'}>{currentYear - 1}</Text>
            </Flex>
            <Grid
              templateColumns="repeat(3, 1fr)"
              py={2}
            >
              {months.map((month, index) => (
                <Box
                  key={month}
                  my="3px"
                  bgColor={selectorButtonBackground(
                    index,
                    currentYear - 1,
                    true,
                  )}
                  borderLeftRadius={selectorButtonStartBorderRadius(
                    index,
                    currentYear - 1,
                  )}
                  borderRightRadius={selectorButtonEndBorderRadius(
                    index,
                    currentYear - 1,
                  )}
                >
                  <Box
                    w="full"
                    h="full"
                    bgColor={selectorButtonBackground(index, currentYear - 1)}
                    borderRadius={
                      selectorButtonStartBorderRadius(index, currentYear - 1) ||
                      selectorButtonEndBorderRadius(index, currentYear - 1)
                    }
                  >
                    <Button
                      onClick={() => handleMonthSelect(index, currentYear - 1)}
                      className={`${getDateClass(index)}`}
                      onMouseOver={() =>
                        handleHoverDate(index, currentYear - 1)
                      }
                      colorScheme="transparent"
                      px="12px"
                      py="6px"
                      w="full"
                      height="full"
                      size={'xs'}
                      _hover={{
                        px: '8px',
                        py: '1px',
                        border: '2px solid white',
                        bgColor: 'cream.50',
                      }}
                    >
                      <Text
                        color={'gray.850'}
                        fontWeight={400}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                      >
                        {month}
                      </Text>
                    </Button>
                  </Box>
                </Box>
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
                  color={'gray.700'}
                  _hover={{ color: 'indigo.900' }}
                  cursor={'pointer'}
                  onClick={() => setCurrentYear(prev => prev + 1)}
                />
              )}
            </Flex>
            <Grid
              templateColumns="repeat(3, 1fr)"
              py={2}
            >
              {months.map((month, index) => (
                <Box
                  key={month}
                  my="3px"
                  bgColor={selectorButtonBackground(index, currentYear, true)}
                  borderLeftRadius={selectorButtonStartBorderRadius(
                    index,
                    currentYear,
                  )}
                  borderRightRadius={selectorButtonEndBorderRadius(
                    index,
                    currentYear,
                  )}
                >
                  <Box
                    w="full"
                    h="full"
                    bgColor={selectorButtonBackground(index, currentYear)}
                    borderRadius={
                      selectorButtonStartBorderRadius(index, currentYear) ||
                      selectorButtonEndBorderRadius(index, currentYear)
                    }
                  >
                    <Button
                      onClick={() => handleMonthSelect(index, currentYear)}
                      className={`${getDateClass(index)}`}
                      onMouseOver={() => handleHoverDate(index, currentYear)}
                      colorScheme="transparent"
                      px="12px"
                      py="6px"
                      w="full"
                      height="full"
                      size={'xs'}
                      _hover={{
                        px: '8px',
                        py: '1px',
                        border: '2px solid white',
                        bgColor: 'cream.50',
                      }}
                    >
                      <Text
                        color={'gray.850'}
                        fontWeight={400}
                        fontSize={'14px'}
                        lineHeight={'20px'}
                      >
                        {month}
                      </Text>
                    </Button>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default CalendarComponent
