import React, { useState } from 'react'
import { Flex, Box, Text, Icon, Button } from '@chakra-ui/react'
import { IoIosArrowDown } from 'react-icons/io'

type Props = {}

const options = [
  'Last 30 days',
  'This month',
  'Last month',
  'This Quarter (Q3, 2024)',
  'Last Quarter (Q2, 2024)',
  '2 Quarters ago (Q1, 2024)',
  '3 Quarters ago (Q4, 2024)',
  'Last 6 months',
  'This  Year',
  'Last Year',
]

const CustomDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectItem, setSelectedItem] = useState('Custom')

  function handleOptionClick(option: string) {
    setSelectedItem(option)
    setIsOpen(false)
  }

  return (
    <Box
      position="relative"
      w="300px"
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
