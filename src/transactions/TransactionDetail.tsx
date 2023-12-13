
import React from "react";
import Link from "next/link";
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
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { BsFillCircleFill } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { BsLink45Deg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import Moment from 'moment'

type Props = {
  toggleClose: () => void;
  transaction: any
};

const TransactionDetail = ({toggleClose, transaction}: Props) => {
  console.log('transaction.date', transaction.date)
  return (
    <Card w={356} display="float" top={"140px"} h={580}>
      <CardHeader>
        <Flex justify="space-between">
          <Text fontSize={["12px"]}>
            Transfer
          </Text>

          <Icon as={RxCross2} cursor="pointer" _hover={{ bg: "blue.100" }} onClick={toggleClose} />
        </Flex>
        <Flex>
          <Text fontSize="32px">
            ${transaction.dollar}
          </Text>
        </Flex>
        <Flex direction="column" fontSize={['12px']}>
          <Flex>
            <VStack spacing={1}>
              <Icon
                as={BsFillCircleFill}
                boxSize={["4px", "6px", "8px", "10px"]}
              />
              <Divider
                orientation="vertical"
                borderColor="gray.900"
                borderWidth="1.5px"
                height="50px"
              />
            </VStack>
            <Box mx={4}>
              <Text>{transaction.toFrom}</Text>
              <Box>
                <Flex>
                  <Text pr={1}>{Moment(transaction.date).format('D MMM')} at</Text>
                  <Text>{Moment(transaction.date).format('h:mm:ss a')}</Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Flex mt={1}>
            <Icon as={FaLocationPin} boxSize={["4px", "6px", "8px", "12px"]} />
            <Box mx={4}>
              <Text>{transaction.toFrom}</Text>
              <Box>
                <Flex>
                  <Text pr={1}>{Moment(transaction.date).format('D MMM')} at </Text>
                  <Text>{Moment(transaction.date).format('h:mm:ss a')}</Text>
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
          <Text fontSize={["12px"]} color="brand.50">
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
        
        {transaction.decoded_tx.action === "mint" ? <Box>
          <Text fontSize={["12px"]}  color="brand.50">
            Wrapping proof:
          </Text>
          <Flex py={4}>
            <Text fontSize={["12px"]}  fontWeight="bold">
              <a target='_blank' href={`https://mempool.space/tx/${transaction.decoded_tx.tx_id}`}>View on block explorer</a>
            </Text>
          </Flex>
        </Box> : null}

        {transaction.memo ? <Flex direction="column">
          <Text fontSize={["12px"]} color="brand.50">
            {" "}
            Memo {" "}
          </Text>
          <Box>
            <Text>{transaction.memo}</Text>
          </Box>
        </Flex> : null}
      </CardBody>
      {/* This is the border line  */}
      <hr />
      <CardFooter>
        <Flex justify="space-between" w="full" alignItems="center">
          <Link href="https://hiveblocks.com/tx/d92bca994c7038a6f59b7743a09af8ff0810080c" target="_blank">
          <Icon as={BsLink45Deg} boxSize={[]}  />
          </Link>
          <Icon as={BsThreeDots} boxSize={[]} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default TransactionDetail;
