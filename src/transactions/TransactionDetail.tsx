import React from 'react'
import Link from 'next/link'
import {
  Text,
  Icon,
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  VStack,
} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { RxCross2 } from 'react-icons/rx'
import { BsFillCircleFill } from 'react-icons/bs'
import { GrFormAdd } from 'react-icons/gr'
import { BsLink45Deg } from 'react-icons/bs'
import { BsThreeDots } from 'react-icons/bs'
import { FaLocationPin } from 'react-icons/fa6'
import Moment from 'moment'
import { readableUsername } from '../components/Sidebar/UserInfo'

type Props = {
  toggleClose: () => void
  transaction: any
}

const START_BLOCK = 88079516
const START_BLOCK_TIME = Moment('2024-08-16T02:46:48Z')

const TransactionDetail = ({ toggleClose, transaction }: Props) => {
  return (
    <Card
      w={356}
      display="float"
      top={'140px'}
      h={580}
    >
      <CardHeader>
        <Flex justify="space-between">
          <Text fontSize={['12px']}>Transfer</Text>

          <Icon
            as={RxCross2}
            cursor="pointer"
            _hover={{ bg: 'blue.100' }}
            onClick={toggleClose}
          />
        </Flex>
        <Flex>
          <Text fontSize="32px">$TODO</Text>
        </Flex>
        <Flex
          direction="column"
          fontSize={['12px']}
        >
          <Flex>
            <VStack spacing={1}>
              <Icon
                as={BsFillCircleFill}
                boxSize={['4px', '6px', '8px', '10px']}
              />
              <Divider
                orientation="vertical"
                borderColor="gray.900"
                borderWidth="1.5px"
                height="50px"
              />
            </VStack>
            <Box mx={4}>
              <Text>{readableUsername(transaction.from)}</Text>
              <Box>
                <Flex>
                  <Text pr={1}>
                    {((transaction.block_height - START_BLOCK) * 3 < 0
                      ? START_BLOCK_TIME.clone().subtract(
                          -(transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                      : START_BLOCK_TIME.clone().add(
                          (transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                    ).format('D MMM')}{' '}
                    at
                  </Text>
                  <Text>
                    {((transaction.block_height - START_BLOCK) * 3 < 0
                      ? START_BLOCK_TIME.clone().subtract(
                          -(transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                      : START_BLOCK_TIME.clone().add(
                          (transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                    ).format('h:mm:ss a')}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Flex mt={1}>
            <Icon
              as={FaLocationPin}
              boxSize={['4px', '6px', '8px', '12px']}
            />
            <Box mx={4}>
              <Text>{readableUsername(transaction.owner)}</Text>
              <Box>
                <Flex>
                  <Text pr={1}>
                    {((transaction.block_height - START_BLOCK) * 3 < 0
                      ? START_BLOCK_TIME.clone().subtract(
                          -(transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                      : START_BLOCK_TIME.clone().add(
                          (transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                    ).format('D MMM')}{' '}
                    at
                  </Text>
                  <Text>
                    {((transaction.block_height - START_BLOCK) * 3 < 0
                      ? START_BLOCK_TIME.clone().subtract(
                          -(transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                      : START_BLOCK_TIME.clone().add(
                          (transaction.block_height - START_BLOCK) * 3,
                          'seconds',
                        )
                    ).format('h:mm:ss a')}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      {/* This is the border line  */}
      <hr />
      <CardBody py={8}>
        <Box py={4}>
          <Text
            fontSize={['12px']}
            color="brand.50"
          >
            Notes
          </Text>
          <Textarea placeholder="Add a note" />
        </Box>

        {/* <Box>
          <Text fontSize={["12px"]} color="brand.50">
            Attachments
          </Text>
          <Flex py={4}>
            <Icon as={GrFormAdd} boxSize={["10px", "12px", "16px", "18px"]} />
            <Text fontSize={["12px"]} px={2} fontWeight="bold">
              Add an Attachment
            </Text>
          </Flex>
        </Box> */}

        <Box>
          <Text
            fontSize={['12px']}
            color="brand.50"
          >
            Raw Transaction:
          </Text>
          <Flex py={4}>
            <Text
              fontSize={['12px']}
              fontWeight="bold"
            >
              <a
                target="_blank"
                href={`https://vsc.techcoderx.com/${
                  transaction.id.startsWith('bafy') ? 'vsc-tx' : 'tx'
                }/${transaction.id}`}
              >
                View on block explorer
              </a>
            </Text>
          </Flex>
        </Box>

        {transaction.memo ? (
          <Flex direction="column">
            <Text
              fontSize={['12px']}
              color="brand.50"
            >
              {' '}
              Memo{' '}
            </Text>
            <Box>
              <Text>{transaction.memo}</Text>
            </Box>
          </Flex>
        ) : null}
      </CardBody>
      {/* This is the border line  */}
      <hr />
      {/* <CardFooter>
        <Flex justify="space-between" w="full" alignItems="center">
          <Link
            href="https://hiveblocks.com/tx/d92bca994c7038a6f59b7743a09af8ff0810080c"
            target="_blank"
          >
            <Icon as={BsLink45Deg} boxSize={[]} />
          </Link>
          <Icon as={BsThreeDots} boxSize={[]} />
        </Flex>
      </CardFooter> */}
    </Card>
  )
}

export default TransactionDetail
