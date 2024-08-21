import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'

const LogoComponent = () => {
  return (
    <Flex justifyContent={'center'}>
      <Image
        src={'./logo.svg'}
        alt="logo"
        width={100}
        height={100}
      />
    </Flex>
  )
}

export default LogoComponent
