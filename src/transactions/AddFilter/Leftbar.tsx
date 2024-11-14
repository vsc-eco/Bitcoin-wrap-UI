import { Box, Flex, Text, Icon, Switch } from '@chakra-ui/react'
import React, { SetStateAction } from 'react'
import { IconType } from 'react-icons/lib'
import { FaChevronRight } from 'react-icons/fa'

type Props = {
  filterOptions: {
    id: number
    name: string
    icon: IconType
  }[]
  selectedItem: number
  setSelectedItem: React.Dispatch<SetStateAction<number>>
}

const Leftbar = ({ filterOptions, selectedItem, setSelectedItem }: Props) => {
  return (
    <Flex
      flexDirection={'column'}
      width={'38%'}
      backgroundColor={'cream.50'}
      boxShadow={'1px 0px 0px cream.100'}
    >
      <Flex
        w="full"
        justifyContent={'center'}
        alignItems={'center'}
        paddingX={'2px'}
        paddingY={'16px'}
        fontSize={'16px'}
        color={'gray.850'}
        gap={4}
        boxShadow={'0px 1px 0px  #d1d5db'}
      >
        <Text size={'sm'}>My transactions</Text>
        <Switch size={'sm'} />
      </Flex>
      {filterOptions.map(option => (
        <Flex
          key={option.id}
          w="full"
          bgColor={selectedItem === option.id ? 'cream.100' : 'transparent'}
          borderBottom={
            selectedItem === option.id ? '2px 1px 3px indigo.700' : 'none'
          }
          justifyContent={'space-between'}
          alignItems="center"
          marginTop={'2px'}
          paddingY={'2px'}
          paddingX="12px"
          marginRight="2px"
          cursor="pointer"
          onClick={() => setSelectedItem(option.id)}
        >
          <Flex alignItems={'center'}>
            <Icon
              as={option.icon}
              color="gray.850"
              fontSize={'small'}
              marginRight={'12px'}
            />
            <Text
              color={'gray.850'}
              cursor={'pointer'}
              fontWeight={400}
              lineHeight={'24px'}
              fontSize={'15px'}
            >
              {option.name}
            </Text>
          </Flex>
          <Flex display={selectedItem === option.id ? 'flex' : 'none'}>
            <Icon
              as={FaChevronRight}
              size="xs"
              color={'gray.850'}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default Leftbar
