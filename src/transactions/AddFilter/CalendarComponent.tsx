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
import { FaArrowLeft } from 'react-icons/fa6'
// import styles from './CalendarComponent.module.css'
import { GoDash } from 'react-icons/go'
import { format } from 'date-fns'

const styles = new Proxy({} as any, {
  get() {
    return ''
  },
})
// styles.sldfj === ''

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

//TODO selecting the date range not happening
//TODO: positioning not happening

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

  // this is for the user to show

  //

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

  const changingYear = () => {
    setCurrentYear(prev => prev - 1)
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
      return 'green'
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
          return 'blue'
        } else if (lastDate.year === year && lastDate.month === month) {
          // dark selected
          return 'red'
        } else {
          return undefined
        }
      } else if (
        hoveredDate.year > year ||
        (hoveredDate.year === year && hoveredDate.month > month)
      ) {
        return 'blue'
      } else if (hoveredDate.year === year && hoveredDate.month === month) {
        // dark selected
        return 'red'
      } else {
        // light selected
        return undefined
      }
    } else {
      if (hoveredDate.year === year && hoveredDate.month === month) {
        // light selected
        return 'yellow'
      }
    }
  }

  return (
    <>
      <Flex
        className={styles.rightbar}
        direction="column"
      >
        <Box
          alignItems={'center'}
          className={styles.rightbar_heading}
        >
          <Text className={styles.heading}>Show transactions for</Text>
          <Select
            placeholder="Custom"
            w="300px"
            className={styles.options_parent}
            variant={'filled'}
          >
            <option
              value="this-month"
              className={styles.options_item}
            >
              This month
            </option>
            <option
              value="last-month"
              className={styles.options_item}
            >
              Last month
            </option>
          </Select>
        </Box>
        <Box className={styles.parent}>
          <Flex
            gap={36}
            pt={4}
          >
            <Text
              mb={2}
              fontSize={'sm'}
              className={styles.from}
            >
              From
            </Text>
            <Text
              mb={2}
              fontSize={'sm'}
              className={styles.To}
            >
              To
            </Text>
          </Flex>
          <Flex className={styles.calendar_container}>
            <Input
              value={monthDateToString(firstDate)}
              mr={1}
            />
            <Icon
              as={GoDash}
              size={'xs'}
              mt={3}
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
        >
          <Box>
            <Flex
              alignItems={'center'}
              gap={10}
            >
              <Icon
                as={FaArrowLeft}
                fontSize={'12px'}
                color={'#73737a'}
                _hover={{ color: 'indigo.900' }}
                cursor={'pointer'}
                onClick={() => changingYear()}
              />
              <Text className={styles.year}>{currentYear - 1}</Text>
            </Flex>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={2}
              py={2}
            >
              {/* 
              :nth-child(n+X)     /* all children from the Xth position onward 
              :nth-child(-n+x)    /* all children up to the Xth position       
              */}
              {months.map((month, index) => (
                <Button
                  key={month}
                  onClick={() => handleMonthSelect(index, currentYear - 1)}
                  onMouseOver={() => handleHoverDate(index, currentYear - 1)}
                  bgColor={selectorButtonBackground(index, currentYear - 1)}
                  size={'xs'}
                  _hover={{
                    bgColor: undefined,
                  }}
                  className={`${getDateClass(index)}`}
                >
                  <Text className={styles.month}>{month}</Text>
                </Button>
              ))}
            </Grid>
          </Box>
          <Box>
            <Flex justify="center">
              <Text className={styles.year}>{currentYear}</Text>
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
                  <Text className={styles.month}>{month}</Text>
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
