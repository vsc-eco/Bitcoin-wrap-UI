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
  Td,
  Icon,
} from '@chakra-ui/react'
import { HiDownload } from 'react-icons/hi'
import { CiFilter } from 'react-icons/ci'
import { gql, useQuery } from '@apollo/client'
import axios from 'axios'
import Moment from 'moment'
import { IoIosSend } from 'react-icons/io'
import { BiTransfer } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import TransactionItem from './TransactionItem'
import TransactionDetail from './TransactionDetail'
import TransferModal from '../components/TransferModal'
import { useCreateTx } from '../hooks/VSC'
import { useAuth } from '../hooks/auth'
import FilterModal from './AddFilter/AddFilterModal'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

import BuyHiveModal from '../components/BuyHive'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaFileInvoice } from 'react-icons/fa6'

import { TbTransferOut } from 'react-icons/tb'

const START_BLOCK = 88079516
const START_BLOCK_TIME = Moment('2024-08-16T02:46:48Z')

const BTC_TOKEN_CONTRACT = '59dfb8383291734049bfab403ced85a57cbcde6a'

const query = gql`
  query MyQuery($userId: String!) {
    findLedgerTXs(filterOptions: { byToFrom: $userId, limit: 50 }) {
      txs {
        amount
        block_height
        idx
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

//data items for actions button

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
  const [isClicked, setIsClicked] = useState(true)
  const [isTransactionDetailOpen, setTransactionDetailOpen] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          p={4}
          borderRadius={8}
          margin="auto"
          w="964px"
          minH="full"
        >
          <Text
            position={'fixed'}
            top={1}
            left={'49%'}
            fontSize="l"
            fontWeight="bolder"
          >
            Transactions
          </Text>
          <Box
            position="fixed"
            top="20px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={10}
            display="flex"
            justifyContent="space-between"
            w="900px"
            my={2}
          >
            <Button
              variant="outline"
              alignItems="center"
              onClick={() => setIsModalOpen(!isModalOpen)}
              borderRadius="3xl"
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
              <FilterModal
                top="74px"
                left="-30px"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
            <Box float="right">
              <BuyHiveModal refetch={refetch} />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={
                    isClicked ? <ChevronDownIcon /> : <ChevronUpIcon />
                  }
                  fontSize="xs"
                  borderRadius="3xl"
                  variant="outline"
                  onClick={() => setIsClicked(!isClicked)}
                >
                  Actions
                </MenuButton>
                <MenuList minWidth="100%">
                  <MenuItem>
                    <TransferModal />
                  </MenuItem>
                  <MenuItem isDisabled={true}>
                    <Flex
                      bgColor={'transparent'}
                      fontSize="sm"
                      gap={2}
                      alignItems={'center'}
                    >
                      <Icon as={BiTransfer} />
                      <Text>Transfer</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
          <Flex
            w="full"
            my={4}
          >
            <Flex
              direction="column"
              w="full"
            >
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
                      <Th textTransform="capitalize">
                        <Box w={12}>
                          <Text>Date</Text>
                          <Text fontSize="9px">(Local Time)</Text>
                        </Box>
                      </Th>
                      <Th textTransform="capitalize">
                        <Box w={200}>To/From</Box>
                      </Th>
                      <Th
                        isNumeric
                        textTransform="capitalize"
                      >
                        Amount
                      </Th>
                      {!isTransactionDetailOpen && (
                        <Th
                          textTransform="capitalize"
                          alignItems="center"
                        >
                          Payment Method
                        </Th>
                      )}
                    </Tr>
                  </Thead>
                  {!loading && <Tbody mt={20}>{transactions} </Tbody>}
                  <Tbody>
                    {loading
                      ? // Render skeletons while loading
                        Array.from({ length: 1 }).map((_, index) => (
                          <Tr key={index}>
                            <Th>
                              <Skeleton height="40px" />
                            </Th>
                            <Th w={620}>
                              <Skeleton
                                height="40px"
                                width={'570px'}
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
            </Flex>
            <Box
              className={`side-popup ${isTransactionDetailOpen ? 'show-popup' : ''}`}
              pr="1px"
              position={'fixed'}
              top={200}
              right={450}
              height={'100vh'}
              width={'400px'}
              zIndex={10}
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
