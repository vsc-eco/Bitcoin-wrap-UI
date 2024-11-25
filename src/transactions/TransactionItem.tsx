'use client'
import React, { useLayoutEffect, useState } from 'react'
import {
  Tr,
  Td,
  WrapItem,
  Avatar,
  Text,
  Flex,
  Box,
  Button,
} from '@chakra-ui/react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Moment from 'moment'
import { readableUsername } from '../components/Sidebar/UserInfo'
import { Skeleton } from '@chakra-ui/react'
import styles from './TransactionItem.module.css'
import { TransactionStatus } from './TransactionStatus'

const START_BLOCK = 88079516
const START_BLOCK_TIME = Moment('2024-08-16T02:46:48Z')

const TransactionItem = props => {
  const {
    showDateProp,
    handleTransactionOpen,
    handleTransactionClose,
    transaction,
    userId,
    selectedId,
  } = props
  const [showDate, setShowDate] = useState(showDateProp)

  function handleMouseEnter() {
    if (!showDateProp) {
      setShowDate(true)
    }
  }

  function handleMouseLeave() {
    if (!showDateProp) {
      setShowDate(false)
    }
  }

  const handleTransactionClick = () => {
    handleTransactionOpen()
  }

  const otherAccount =
    userId === transaction.owner ? transaction.from : transaction.owner

  const readableOtherAccount = readableUsername(otherAccount)

  const moneyIn = userId === transaction.owner

  const isSelected = transaction.id === selectedId

  return (
    <Tr
      _hover={{ bg: 'blue.100' }}
      cursor="pointer"
      sx={{
        td: {
          height: '40px',
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTransactionClick}
      className={`${styles.murItem} ${isSelected ? styles.murItemActive : ''}`}
      borderBottom={'1px'}
      borderBottomColor={'#D1D5DB'}
    >
      {/* Date Column */}
      <Td
        textAlign="center"
        width="15%"
      >
        {showDate
          ? ((transaction.block_height - START_BLOCK) * 3 < 0
              ? START_BLOCK_TIME.clone().subtract(
                  -(transaction.block_height - START_BLOCK) * 3,
                  'seconds',
                )
              : START_BLOCK_TIME.clone().add(
                  (transaction.block_height - START_BLOCK) * 3,
                  'seconds',
                )
            ).format('MMM D')
          : null}
      </Td>

      {/* User Info Column */}
      <Td
        display="flex"
        alignItems="center"
        width="45%"
        border={'none'}
      >
        <WrapItem>
          <Avatar
            name={readableOtherAccount}
            src={`https://images.hive.blog/u/${readableOtherAccount}/avatar`}
            size="sm"
          />
        </WrapItem>
        <Text
          px={2}
          fontSize={['12px']}
        >
          {readableOtherAccount}
        </Text>
        {transaction.status !== 'CONFIRMED' &&
          transaction.status !== 'FAILED' && (
            <TransactionStatus
              borderColor="gray.200"
              text="Pending"
            />
          )}
        {transaction.status === 'FAILED' && (
          <TransactionStatus
            textColor="#b0175f"
            borderColor="#b0175f29"
            text="Failed"
          />
        )}
      </Td>

      {/* Amount Column */}
      <Td
        textAlign="right"
        width="20%"
      >
        <Text color={moneyIn ? 'green' : undefined}>
          {moneyIn ? '' : '-'}
          {transaction.amount / 1_000}
          &nbsp;
          {transaction.tk}
        </Text>
      </Td>

      {/* Transfer Method Column */}
      <Td
        textAlign="center"
        width="20%"
      >
        <Flex alignItems="center">
          {moneyIn ? <BsArrowLeft /> : <BsArrowRight />}
          {'  '}
          &nbsp;
          <Text>{transaction.t}</Text>
        </Flex>
      </Td>
    </Tr>
  )
}

export default TransactionItem
