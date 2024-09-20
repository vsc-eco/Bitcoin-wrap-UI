import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { accountData } from '../../types/types'
import { useColorMode } from '@chakra-ui/react'

type Props = {
  item: accountData
}

const AccountData = ({ item }: Props) => {
  const { colorMode } = useColorMode()
  return (
    <Flex
      w="full"
      p={2}
      justifyContent="space-between"
      fontWeight="normal"
      cursor="pointer"
      _hover={{
        backgroundColor: colorMode === 'light' ? 'gray.100' : 'gray.500',
      }}
    >
      <Flex
        align="center"
        gap={2}
      >
        <Image
          src={item.image}
          alt={'logo'}
          width={20}
          height={20}
        />
        <Text>{item.name}</Text>
      </Flex>
      <Flex alignSelf="end">
        <Text>${item.price}</Text>
        <Text
          fontSize="2xs"
          lineHeight="none"
        >
          .{item.decimalValue}
        </Text>
      </Flex>
    </Flex>
  )
}

export default AccountData
