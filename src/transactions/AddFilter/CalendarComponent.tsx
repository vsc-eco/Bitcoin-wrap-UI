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
import styles from './CalendarComponent.module.css'
import { GoDash } from 'react-icons/go'
import { format, lastDayOfMonth } from 'date-fns'

type Props = {}
const CalendarComponent = (props: Props) => {
  const [firstDate, setFirstDate] = useState(
    `${format(new Date(), 'MMM d, yyyy')}`,
  )
  const [lastDate, setLastDate] = useState('Today')
  const [currentYear, setCurrentYear] = useState<number>(2024)
  const [firstSelected, setFirstSelected] = useState(false)

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

  const handleMonthSelect = (monthIndex: number) => {
    const currentYearValue = firstDate ? currentYear : currentYear - 1
    const selectedDate = new Date(currentYearValue, monthIndex, 1)
    const lastDateOfMonth = format(lastDayOfMonth(selectedDate), 'MMM d, yyyy')

    if (!firstSelected) {
      setFirstDate(format(selectedDate, 'MMM d, yyyy'))
      setLastDate(lastDateOfMonth)
      setFirstSelected(true)
    } else {
       const firstDateObj = new Date(firstDate);
       if(selectedDate < firstDateObj){
        setLastDate(format(firstDateObj, 'MMM d, yyyy'));
        setFirstDate(format(selectedDate, 'MMM d, yyyy'));
       } else {
        setLastDate(lastDateOfMonth)
      }
    }
  }

  const changingYear = () => {
    setCurrentYear(prev => prev - 1)
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
              value={firstDate}
              mr={1}
              defaultValue={'Feb 1, 2023'}
            />
            <Icon
              as={GoDash}
              size={'xs'}
              mt={3}
            />
            <Input
              value={lastDate}
              ml={1}
              defaultValue={'Feb 28, 2023'}
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
                _hover={{ color: '#527ef0' }}
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
              {months.map((month, index) => (
                <Button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  size={'xs'}
                  className={styles.calendar_button}
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
                  onClick={() => handleMonthSelect(index)}
                  size={'xs'}
                  className={styles.calendar_button}
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
