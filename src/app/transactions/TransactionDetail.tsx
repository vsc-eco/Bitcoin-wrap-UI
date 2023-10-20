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

type Props = {
  toggleClose: () => void;
  transaction: any
};

const TransactionDetail = ({toggleClose, transaction}: Props) => {
  return (
    <Card w={356} display="float" top={20} h={600}>
      <CardHeader>
        <Flex justify="space-between">
          <Text fontSize={["12px"]} color="brand.50">
            Transfer
          </Text>

          <Icon as={RxCross2} cursor="pointer" _hover={{ bg: "blue.100" }} onClick={toggleClose} />
        </Flex>
        <Flex>
          <Text fontSize="32px" color="brand.50">
            ${transaction.dollar}.00
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
                {/* <Text>Mercury Checking ••1038</Text> */}
                <Flex>
                  <Text pr={1}>{transaction.date} at</Text>
                  <Text>10:36 am</Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Flex mt={1}>
            <Icon as={FaLocationPin} boxSize={["4px", "6px", "8px", "12px"]} />
            <Box mx={4}>
              <Text>{transaction.toFrom}</Text>
              <Box>
                {/* <Text>Mercury Checking ••1038</Text> */}
                <Flex>
                  <Text pr={1}>{transaction.date} at </Text>
                  <Text>10:36 am</Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      {/* This is the border line  */}
      <hr />
      <CardBody>
        <Box py={4}>
          <Text fontSize={["12px"]} color="brand.50">
            Notes
          </Text>
          <Textarea placeholder="Add a note" />
        </Box>

        <Box>
          <Text fontSize={["12px"]} color="brand.50">
            Attachments
          </Text>
          <Flex py={4}>
            <Icon as={GrFormAdd} boxSize={["10px", "12px", "16px", "18px"]} />
            <Text fontSize={["12px"]} px={2} fontWeight="bold">
              Add an Attachment
            </Text>
          </Flex>
        </Box>

        <Flex my={4} direction="column">
          <Text fontSize={["12px"]} color="brand.50">
            {" "}
            Memo {" "}
          </Text>
          <Box>
            <Text>kcs-126249</Text>
          </Box>
        </Flex>
      </CardBody>
      {/* This is the border line  */}
      <hr />
      <CardFooter>
        <Flex justify="space-between" w="full" alignItems="center">
          <Link href="https://hiveblocks.com/tx/d92bca994c7038a6f59b7743a09af8ff0810080c">
          <Icon as={BsLink45Deg} boxSize={[]}  />
          </Link>

          <Icon as={BsThreeDots} boxSize={[]} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default TransactionDetail;
