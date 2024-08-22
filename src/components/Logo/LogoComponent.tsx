import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'

const LogoComponent = () => {
  return (
    <Flex justifyContent={'center'}>
      <Image
        src="/VSC-Logo.png"
        alt="logo"
        width={50}
        height={50}
      />
    </Flex>
  )
}

export default LogoComponent
