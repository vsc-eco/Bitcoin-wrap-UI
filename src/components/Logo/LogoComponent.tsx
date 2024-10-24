'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Flex, Text, Icon } from '@chakra-ui/react'
import { TbArrowsMoveVertical } from 'react-icons/tb'
import Dropdown from '../LogoDropDown/Dropdown'

const LogoComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems="center"
      w="full"
      cursor="pointer"
      onClick={() => setIsOpen(!isOpen)}
      position="relative"
    >
      <Flex
        gap={2}
        alignItems="center"
      >
        <Image
          src="/vsc.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <Text size="xs">VSC DEFI</Text>
      </Flex>
      <Icon as={TbArrowsMoveVertical} />
      {isOpen && (
        <Flex
          position={'absolute'}
          top={10}
          left={1}
          bg="white"
          zIndex={10}
          w="250px"
          h={190}
          borderRadius={'lg'}
          boxShadow={'base'}
        >
          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default LogoComponent
