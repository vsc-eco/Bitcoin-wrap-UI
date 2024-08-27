'use client'
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
} from 'react'
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
  Skeleton,
} from '@chakra-ui/react'
import { HiDownload } from 'react-icons/hi'
import { CiFilter } from 'react-icons/ci'
import { gql, useQuery } from '@apollo/client'
import axios from 'axios'
import Moment from 'moment'

import TransactionItem from './TransactionItem'
import TransactionDetail from './TransactionDetail'
import TransferModal from '../components/TransferModal'
import RedeemModal from '../components/RedeemModal'
import { useCreateTx } from '../hooks/VSC'
import { useAuth } from '../hooks/auth'
import FilterModal from './AddFilter/AddFilterModal'
import { ChevronDownIcon } from '@chakra-ui/icons'

const START_BLOCK = 88079516
const START_BLOCK_TIME = Moment('2024-08-16T02:46:48Z')

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
  const [price, setPrice] = useState<number | undefined>()

  useLayoutEffect(() => {
    const fetchPrice = async () => {
      const { data } = await axios.get(`/api/bitcoin_price`)
      setPrice(data.price)
    }

    fetchPrice()
  }, [])

  return price
}

type Props = {}

const Transaction = (props: Props) => {
  const { transfer } = useCreateTx()
  const lastDateRef = useRef<string | null>(null)

  const [isTransactionDetailOpen, setTransactionDetailOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filterButtonRef = useRef<HTMLButtonElement | null>(null)
  const [filterModalPosition, setFilterModalPosition] = useState({
    top: 0,
    left: 0,
  })

  const auth = useAuth()

  const { data, loading, refetch } = useQuery(query, {
    variables: { userId: auth.authenticated ? auth.userId : '' },
    errorPolicy: 'ignore',
    skip: !auth.authenticated,
  })

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000)
    return () => clearInterval(intervalId)
  }, [refetch])

  useEffect(() => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect()
      setFilterModalPosition({
        top: rect.bottom,
        left: rect.right,
      })
    }
  }, [isModalOpen])

  const bitcoinPrice = useBitcoinPrice()

  const handleTransactionOpen = (transaction: any) => {
    setTransactionDetailOpen(true)
    setSelectedTransaction(transaction)
  }

  const handleTransactionClose = () => {
    setTransactionDetailOpen(false)
    setSelectedTransaction(null)
  }

  const transactions = useMemo(() => {
    if (!data) return []

    const txs = data.findLedgerTXs?.txs || []
    let lastDate = ''

    return txs.map((tx: any) => {
      const dateStr = (
        (tx.block_height - START_BLOCK) * 3 < 0
          ? START_BLOCK_TIME.clone().subtract(
              -(tx.block_height - START_BLOCK) * 3,
              'seconds',
            )
          : START_BLOCK_TIME.clone().add(
              (tx.block_height - START_BLOCK) * 3,
              'seconds',
            )
      ).format('D MMM')

      const showDateProp = lastDate !== dateStr
      if (showDateProp) lastDate = dateStr

      return (
        <TransactionItem
          key={tx.id}
          userId={auth.authenticated && auth.userId}
          showDateProp={showDateProp}
          transaction={tx}
          handleTransactionOpen={() => handleTransactionOpen(tx)}
          isTransactionDetailOpen={isTransactionDetailOpen}
          selectedId={selectedTransaction ? selectedTransaction.id : null}
          handleTransactionClose={handleTransactionClose}
        />
      )
    })
  }, [data, auth, isTransactionDetailOpen, selectedTransaction])

  return (
    <>
      <Flex
        justifyContent="center"
        h="90vh"
      >
        <Flex
          direction="column"
          py={4}
          textAlign="center"
          bgColor="white"
          p={4}
          borderRadius={8}
          margin="auto"
          w="814px"
          minH="full"
        >
          <Text
            fontSize="l"
            fontWeight="bolder"
          >
            Transactions
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            my={2}
            position="relative"
          >
            <Button
              alignItems="center"
              onClick={() => setIsModalOpen(!isModalOpen)}
              borderRadius="3xl"
              ref={filterButtonRef}
            >
              <CiFilter />
              <Text
                size="s"
                fontSize="xs"
              >
                Add Filter
              </Text>
            </Button>
            {isModalOpen && (
              <Box
                position="absolute"
                top={`${filterModalPosition.top}px`}
                left={`${filterModalPosition.left}px`}
                zIndex={1000}
              >
                <FilterModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </Box>
            )}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                fontSize="xs"
                borderRadius="3xl"
              >
                Actions
              </MenuButton>
              <MenuList minWidth="100%">
                <MenuItem>
                  <TransferModal refetch={refetch} />
                </MenuItem>
                <MenuItem>
                  <RedeemModal />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Flex overflowY="auto">
            <TableContainer
              display="flex"
              alignItems="start"
            >
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
                    {!isTransactionDetailOpen && (
                      <Th
                        textTransform="capitalize"
                        display="flex"
                        alignItems="center"
                      >
                        Payment Method
                      </Th>
                    )}
                  </Tr>
                </Thead>

                <Tbody>
                  {loading
                    ? // Render skeletons while loading
                      Array.from({ length: 1 }).map((_, index) => (
                        <Tr key={index}>
                          <Th>
                            <Skeleton height="40px" />
                          </Th>
                          <Th>
                            <Skeleton
                              height="40px"
                              width={'370px'}
                            />
                          </Th>
                          <Th>
                            <Skeleton height="40px" />
                          </Th>
                          {!isTransactionDetailOpen && (
                            <Th>
                              <Skeleton height="40px" />
                            </Th>
                          )}
                        </Tr>
                      ))
                    : transactions}
                </Tbody>
              </Table>
            </TableContainer>
            <Box
              className={`side-popup ${isTransactionDetailOpen ? 'show-popup' : ''}`}
              style={{ top: 0 }}
            >
              {isTransactionDetailOpen && (
                <TransactionDetail
                  userId={auth.authenticated && auth.userId}
                  toggleClose={handleTransactionClose}
                  transaction={selectedTransaction}
                />
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Transaction
