import React, { SetStateAction } from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import Image from 'next/image'
import { Navigate, useNavigate, Link } from 'react-router-dom'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Dropdown = ({ isOpen, setIsOpen }: Props) => {
  const options = [
    {
      title: 'Settings',
      link: '/settings/account-profile',
    },
    {
      title: '2nd option',
      link: '/option',
    },
  ]
  return (
    <Flex
      flexDirection="column"
      w="full"
      justifyContent="space-between"
    >
      <Box>
        {options.map((item, index) => (
          <Box
            w="full"
            px={2}
            py={1}
            key={index}
            _hover={{
              bg: 'gray.70',
              color: 'black',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link to={item.link}>{item.title}</Link>
          </Box>
        ))}

        <Box boxShadow="0px 1px 0px #d1d5db">
          <Text
            fontSize={'12px'}
            px={2}
            pt={4}
          >
            Switch accounts
          </Text>
        </Box>

        <Flex
          py={2}
          px={2}
          gap={2}
          alignItems={'center'}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Image
            alt="dp"
            src={'/VSC-Logo.png'}
            width={30}
            height={10}
          />
          <Text>Wallet address ...</Text>
        </Flex>

        <Flex
          py={2}
          px={2}
          gap={2}
          alignItems={'center'}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Image
            alt="dp"
            src={'/VSC-Logo.png'}
            width={30}
            height={10}
          />
          <Text>Wallet address ...</Text>
        </Flex>
      </Box>
      <Box
        boxShadow={'0px -1px 0px 0px #d1d5db'}
        py={2}
      >
        <Box
          py={1}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Text
            px={2}
            fontSize={'sm'}
          >
            Create an account
          </Text>
        </Box>
        <Box
          py={1}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Text
            px={2}
            fontSize={'sm'}
          >
            Link new account
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Dropdown
