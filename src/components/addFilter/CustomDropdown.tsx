//TODO:There needs to be an automatic option for selecting the default date

import React, { useEffect, useRef, useState } from 'react'
import { Flex, Box, Text, Icon, Button } from '@chakra-ui/react'
import { IoIosArrowDown } from 'react-icons/io'

type Props = {
  options: string[]
}

const CustomDropdown = ({ options }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectItem, setSelectedItem] = useState('Automatic')
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
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        w="300px"
        px={4}
        py={2}
        bg="gray.50"
        border="2px solid"
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
            <Box
              px={2}
              py={1}
              key={index}
              _hover={{
                bg: 'indigo.900',
                color: 'white',
              }}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default CustomDropdown
