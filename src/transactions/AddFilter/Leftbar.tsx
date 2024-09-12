//TODO: leftbar needs to be of full height
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
      backgroundColor={'#fbfcfd'}
      boxShadow={'1px 0px 0px #f0f1f4'}
    >
      <Flex
        w="full"
        justifyContent={'center'}
        alignItems={'center'}
        paddingX={'4px'}
        paddingY={'16px'}
        fontSize={'16px'}
        color={'#535461'}
        gap={2}
      >
        <Text size={'sm'}>My transactions</Text>
        <Switch size={'sm'} />
      </Flex>
      {filterOptions.map(option => (
        <Flex
          key={option.id}
          w="full"
          bgColor={selectedItem === option.id ? '#f3f4f7' : 'transparent'}
          justifyContent={'space-between'}
          alignItems="center"
          marginTop={'2px'}
          paddingY={'2px'}
          paddingX="12px"
          borderRadius={'12px'}
          marginRight="2px"
          cursor="pointer"
          onClick={() => setSelectedItem(option.id)}
        >
          <Flex alignItems={'center'}>
            <Icon
              as={option.icon}
              color="#535461"
              fontSize={'small'}
              marginRight={'12px'}
            />
            <Text
              color={'#535461'}
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
              color={'#54545e'}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default Leftbar
