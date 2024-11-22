import React, { useEffect, useRef, useState } from 'react'
import { Flex, Button, Box, Text, Icon } from '@chakra-ui/react'
import { IoIosArrowDown } from 'react-icons/io'
import { IconType } from 'react-icons/lib'

type Props = {
  options: {
    name: string
    symbol: IconType
  }[]
  disable?: boolean
}

const DropdownWithIcon = ({ options, disable }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectItem, setSelectedItem] = useState(options[0].name)
  const dropdownRef = useRef<HTMLInputElement>(null)

  function handleOptionClick(option: string) {
    setSelectedItem(option)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Box
      position="relative"
      w="300px"
      ref={dropdownRef}
      borderBottomWidth={isOpen ? '2px' : '0px'}
      borderBottomColor={isOpen ? 'indigo.900' : 'transparent'}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        w="300px"
        px={4}
        py={2}
        bg="gray.50"
        border={isOpen ? '0px' : '2px solid'}
        borderColor="gray.100"
        justifyContent="space-between"
      >
        <span>{selectItem}</span>
        <Icon as={IoIosArrowDown} />
      </Button>

      {isOpen && (
        <Box
          position="absolute"
          w="300px"
          mt={1}
          bg="white"
          border="2px solid"
          borderColor="gray.100"
          zIndex="10"
          borderRadius="md"
          boxShadow="xs"
        >
          {options.map((item, index) => (
            <Flex
              px={2}
              py={1}
              key={index}
              _hover={{
                bg: 'indigo.900',
                color: 'white',
              }}
              onClick={() => !disable && handleOptionClick(item.name)}
              alignItems="center"
              gap={2}
              opacity={disable ? '0.2' : 1}
              cursor={disable ? 'not-allowed' : 'pointer'}
            >
              <Icon
                as={item.symbol}
                fontWeight={'bold'}
              />
              <Text>{item.name}</Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default DropdownWithIcon
