import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export function LoginOptions({ children }: PropsWithChildren<{}>) {
  return (
    <Flex
      gap={2}
      w="full"
      wrap="wrap"
      justifyContent="center"
    >
      {children}
    </Flex>
  )
}
