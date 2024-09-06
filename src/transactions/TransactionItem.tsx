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
    //if showDate is false then make it true
    if (!showDateProp) {
      setShowDate(true) //updating the state not the prop
    }
  }

  function handleMouseLeave() {
    if (!showDateProp) {
      setShowDate(false)
    }
  }

  //function for toggling the transaction detail modal
  const handleTransactionClick = () => {
    handleTransactionOpen()
  }

  const otherAccount =
    userId === transaction.owner ? transaction.from : transaction.owner

  const readableOtherAccount = readableUsername(otherAccount)

  const moneyIn = userId === transaction.owner

  const isSelected = transaction.id === selectedId

  console.log(
    'transaction.id===selectedId',
    transaction.id,
    selectedId,
    isSelected,
  )

  return (
    <Tr
      _hover={{ bg: 'blue.100' }}
      cursor="pointer"
      sx={{
        td: {
          h: '40px',
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTransactionClick}
      className={`${styles.murItem} ${isSelected ? styles.murItemActive : ''}`}
    >
      <Td w={22}>
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

      <Td
        display="flex"
        alignItems="center"
        w={!props.isTransactionDetailOpen ? 412 : 0}
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
      <Td isNumeric>
        <Text color={moneyIn ? 'green' : undefined}>
          {moneyIn ? '' : '-'}
          {transaction.amount / 1_000}
          &nbsp;
          {transaction.tk}
        </Text>
        {/* &nbsp; (${transaction.dollar}) */}
      </Td>

      {!props.isTransactionDetailOpen ? (
        <Td>
          <Flex>
            {/* {transaction.paymentMethod === "Transfer" &&
          transaction.TransferIn ? (
            <BsArrowLeft />
          ) : transaction.paymentMethod === "Transfer" &&
            !transaction.TransferIn ? (
            <BsArrowRight />
          ) : null} */}
            {moneyIn ? <BsArrowLeft /> : <BsArrowRight />}
            {'  '}
            &nbsp;
            <Text>{transaction.t}</Text>
          </Flex>
        </Td>
      ) : transaction.id === selectedId ? (
        <Td
          style={{
            width: '100%',
            backgroundColor: 'white',
          }}
          onClick={e => {
            e.stopPropagation()

            if (props.handleTransactionClose) {
              props.handleTransactionClose()
            }
          }}
        >
          <button
            style={{
              background: 'url(./arrow-right.svg) 50%/24px 24px no-repeat',
              width: '10px',
              height: '20px',
            }}
            className={styles.murCancelItem}
          ></button>
        </Td>
      ) : null}
    </Tr>
  )
}

export default TransactionItem
