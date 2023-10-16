import React from "react";
import {
  Text,
  Icon,
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { BsDot } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { BsLink45Deg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

type Props = {};

const TransactionDetail = (props: Props) => {
  return (
    <Card w={356} display="float" top={20} color="brand.50">
      <CardHeader>
        <Flex justify="space-between">
          <Text fontSize={["12px"]}>Transfer</Text>

          <Icon as={RxCross2} cursor="pointer" _hover={{ bg: "blue.100" }} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex>
          <Text fontSize="32px">$24,009.16</Text>
        </Flex>
        <Flex>
          <Flex>
            <Icon as={BsDot} boxSize={["4px", "6px", "8px", "22px"]} />
          </Flex>
          <Flex></Flex>
        </Flex>
        {/* This is the border line  */}
        <hr />

        <Box py={4}>
          <Text fontSize={["12px"]}>Notes</Text>
          <Textarea placeholder="Here is a sample placeholder" />
        </Box>
    
        <Box>
          <Text fontSize={["12px"]}>Attachments</Text>
          <Flex py={4}>
            <Icon as={GrFormAdd} boxSize={["10px", "12px", "16px", "18px"]} />
            <Text fontSize={["12px"]} px={2} fontWeight="bold">
              Add an Attachment
            </Text>
          </Flex>
        </Box>

        <Flex my={4} direction="column">
          <Text fontSize={["12px"]}> Bank Description </Text>
          <Box>
            <Text>#HERE WILL BE THE REFERENCE NUMBER</Text>
          </Box>
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex justify="space-between" w="full">
          <Icon as={BsLink45Deg} boxSize={[]} />

          <Icon as={BsThreeDots} boxSize={[]} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default TransactionDetail;
