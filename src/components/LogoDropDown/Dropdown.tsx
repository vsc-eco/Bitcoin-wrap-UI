import React, { SetStateAction, useEffect, useRef } from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import Image from 'next/image'
import { Navigate, useNavigate, Link } from 'react-router-dom'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Dropdown = ({ isOpen, setIsOpen }: Props) => {
  const dropdownRef = useRef<HTMLInputElement>(null)

  const options = [
    {
      title: 'Settings',
      link: '/settings/account-profile',
    },
  ]

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
    <Flex
      flexDirection="column"
      w="full"
      justifyContent={'space-between'}
      ref={dropdownRef}
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
            <Link to={item.link}>
              <Text
                fontWeight={400}
                color={'gray.850'}
              >
                {item.title}
              </Text>
            </Link>
          </Box>
        ))}

        {/* <Box boxShadow="0px 1px 0px #d1d5db">
          <Text
            fontSize={'12px'}
            px={2}
            color={'gray.850'}
          >
            Switch accounts
          </Text>
        </Box> */}

        {/* <Flex
          px={2}
          py={1}
          gap={2}
          alignItems={'center'}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Image
            alt="dp"
            src={'/vsc.svg'}
            width={30}
            height={5}
            color="gray.850"
          />
          <Text color={'gray.850'}>Wallet address ...</Text>
        </Flex>

        <Flex
          px={2}
          py={1}
          gap={2}
          alignItems={'center'}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Image
            alt="dp"
            src={'/vsc.svg'}
            width={30}
            height={5}
          />
          <Text color={'gray.850'}>Wallet address ...</Text>
        </Flex> */}
      </Box>
      <hr />
      <Box>
        <Box
          py={1}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Text
            px={2}
            color={'gray.850'}
          >
            Create an account
          </Text>
        </Box>
        {/* <Box
          py={1}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Text
            px={2}
            color={'gray.850'}
          >
            Link new account
          </Text>
        </Box> */}
        <hr />
        <Box
          py={1}
          _hover={{
            backgroundColor: 'gray.70',
          }}
        >
          <Text
            px={2}
            color={'gray.850'}
          >
            Logout
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Dropdown
