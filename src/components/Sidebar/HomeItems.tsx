import React, { ReactNode } from 'react'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import { useLocation } from 'react-router-dom'

type Props = {
  item: {
    icon: ReactNode
    text: string
    loc: string
    onClick: () => void
  }
}

const HomeItems = ({ item }: Props) => {
  const loc = useLocation()

  return (
    <Flex
      alignItems="center"
      justifyContent={'center'}
      onClick={item.onClick}
    >
      <Flex
        alignItems={'center'}
        gap={1}
        w={36}
        paddingX={2}
        paddingY={1}
        borderRadius={'sm'}
        color={loc.pathname === item.loc ? 'black' : 'gray.900'}
        bgColor={loc.pathname === item.loc ? 'gray.50' : 'white'}
        fontWeight={loc.pathname === item.loc ? 480 : undefined}
        cursor={'pointer'}
      >
        <Text color={loc.pathname === item.loc ? 'indigo.900' : 'gray.800'}>
          {item.icon}
        </Text>
        <Text
          ml={1}
          fontSize="xs"
          cursor={'pointer'}
        >
          {item.text}
        </Text>
      </Flex>
    </Flex>
  )
}

export default HomeItems
