import React from 'react'
import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const AlertComponent = ({ children }: Props) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        h={112}
        w={300}
        justifyContent={'center'}
      >
        <Alert>
          <AlertIcon />
          <AlertDescription>{children}</AlertDescription>
        </Alert>
      </Flex>
    </Flex>
  )
}
