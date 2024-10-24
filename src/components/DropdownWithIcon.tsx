import React, { useState } from 'react'
import { Flex, Button, Box, Text, Icon } from '@chakra-ui/react'
import { IoIosArrowDown } from 'react-icons/io'
import { IconType } from 'react-icons/lib'

type Props = {
  options: {
    name: string
    symbol: IconType
  }[]
}

const DropdownWithIcon = ({ options }: Props) => {
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
            <Flex
              px={2}
              py={1}
              key={index}
              _hover={{
                bg: 'indigo.900',
                color: 'white',
              }}
              onClick={() => handleOptionClick(item.name)}
              alignItems="center"
              gap={2}
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
