'use client'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import {
  Button,
  Table,
  Text,
  Box,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { HiDownload } from 'react-icons/hi'
import { CiFilter } from 'react-icons/ci'
import { ErrorPolicy, gql } from '@apollo/client'
import axios from 'axios'
import Moment from 'moment'

import TransactionItem from './TransactionItem'
import TransactionDetail from './TransactionDetail'

//graphql code for the integration of api
import { client } from '../apollo/client'
import { useQuery } from '@apollo/client'
import { ChevronDownIcon } from '@chakra-ui/icons'
import TransferModal from '../components/TransferModal'
import RedeemModal from '../components/RedeemModal'
import { useCreateTx } from '../hooks/VSC'
import { useAuth } from '../hooks/auth'

const START_BLOCK = 88079516
const START_BLOCK_TIME = Moment('2024-08-16T02:46:48Z')
//fetching the details

const BTC_TOKEN_CONTRACT = '59dfb8383291734049bfab403ced85a57cbcde6a'

const query = gql`
  query MyQuery($userId: String!) {
    findLedgerTXs(filterOptions: { byToFrom: $userId, limit: 50 }) {
      txs {
        amount
        block_height
        from
        id
        memo
        owner
        t
        tk
        status
      }
    }
  }
`

function useBitcoinPrice() {
  const [price, setPrice] = useState()

  useLayoutEffect(() => {
    void (async () => {
      const { data } = await axios.get(`/api/bitcoin_price`)
      setPrice(data.price)
    })()
  }, [])

  return price
}

type Props = {}

const Transaction = (props: Props) => {
  const { transfer } = useCreateTx()
  let lastDate = useRef(null)

  //useState
  const [isTransactionDetailOpen, setTransactionDetailOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const auth = useAuth()

  const { data, refetch } = useQuery(query, {
    variables: {
      userId: auth.authenticated && auth.userId,
    },
    errorPolicy: 'ignore',
    skip: !auth.authenticated,
  })

  useEffect(() => {
    const id = setInterval(refetch, 3000)
    return () => clearInterval(id)
  }, [refetch])

  //using the api
  const bitcoinPrice = useBitcoinPrice()
  // const items = data?.findLedgerTXs?.txs || [];
  // console.log("items", items, data);

  //function for handling the state
  const handleTransactionOpen = transaction => {
    setTransactionDetailOpen(true)
    setSelectedTransaction(transaction)
  }

  //function for closing the modal again
  const handleTransactionClose = () => {
    setTransactionDetailOpen(false)
  }

  return (
    <>
      <Flex
        justifyContent="center"
        h="90vh"
      >
        <Flex
          direction="column"
          py={4}
          textAlign={'center'}
          bgColor={'white'}
          p={4}
          borderRadius={8}
          margin="auto"
          w="full"
          minH="60vh"
        >
          <Text
            fontSize="l"
            fontWeight={'bolder'}
          >
            Transactions
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            my={2}
          >
            <Button alignItems="center">
              <CiFilter />
              <Text
                size="s"
                fontSize="xs"
              >
                Add Filter
              </Text>
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                fontSize="xs"
              >
                Actions
              </MenuButton>
              <MenuList style={{ minWidth: '100%' }}>
                <MenuItem>
                  <TransferModal
                    refetch={() => {
                      console.log('TODO refetch?')
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <RedeemModal />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box overflowY="auto">
            <TableContainer alignSelf="center" style={{
              display: 'flex',
            }}>
              <Table
                variant="simple"
                size="sm"
              >
                <Thead>
                  <Tr>
                    <Th
                      w={32}
                      display="flex"
                      textTransform="capitalize"
                    >
                      <Text px="1">Date</Text>
                      <Text fontSize="10px">(Local Time)</Text>
                    </Th>
                    <Th textTransform="capitalize">To/From</Th>
                    <Th
                      isNumeric
                      textTransform="capitalize"
                    >
                      Amount
                    </Th>
                    {!isTransactionDetailOpen ? <Th
                      textTransform="capitalize"
                      display="flex"
                      alignItems="center"
                    >
                      Payment Method
                    </Th> : null}
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    (() => {
                      const map:Array<any> = []
                      let lastDate = ''

                      for(let tx of data?.findLedgerTXs?.txs || []) {
                        const dateStr = ((tx.block_height - START_BLOCK) * 3 < 0
                        ? START_BLOCK_TIME.clone().subtract(
                            -(tx.block_height - START_BLOCK) * 3,
                            'seconds',
                          )
                        : START_BLOCK_TIME.clone().add(
                            (tx.block_height - START_BLOCK) * 3,
                            'seconds',
                          )
                      ).format('D MMM')
                      let showDateProp;
                      if(lastDate !== dateStr) { 
                        showDateProp = true
                        lastDate = dateStr
                      } else {
                        showDateProp = false
                      }
                        map.push(<TransactionItem
                          userId={auth.authenticated && auth.userId}
                          showDateProp={showDateProp}
                          key={tx.id}
                          transaction={tx}
                          handleTransactionOpen={() => handleTransactionOpen(tx)}
                          isTransactionDetailOpen={isTransactionDetailOpen}
                          selectedId={selectedTransaction ? selectedTransaction.id : null}
                          handleTransactionClose={handleTransactionClose}
                        />)
                      }

                      return map
                    })()
                  }
                  
                </Tbody>
              </Table>
              <Box
                className={`side-popup ${isTransactionDetailOpen} ? 'show-popup' : ''`}
                style={{
                  top: 0
                }}
              >
                {isTransactionDetailOpen && (
                  <TransactionDetail
                    userId={auth.authenticated && auth.userId}
                    toggleClose={handleTransactionClose}
                    transaction={selectedTransaction}
                  />
                )}
              </Box>
            </TableContainer>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Transaction
