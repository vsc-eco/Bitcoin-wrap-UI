import React from 'react'
import ExchangeModal from './components/ExchangeModal'
import DepositModal from './components/DepositModal'
import Navbar from './components/Navbar'
import { Box, Flex, Text } from "@chakra-ui/react"
import Sidebar from './components/Sidebar'
import Image from "next/image"
type Props = {}

const Page = (props: Props) => {
  return (
    <>
      <Navbar />
      <Box bgGradient="linear(to-l, #919ca9, #fefeff)" h="500vh">
        <Flex>
          <Sidebar /> 
          <Box flex="1"> 
             <Flex h="100vh" w="full" justifyContent="space-evenly" alignItems="center">
              <Box>
                <Text fontSize="5rem" p={24}>HIVE Finance: smooth DeFi experience</Text>
              </Box>
              <Box>
                <Image src="/Landing.svg" alt='Langing' width={800} height={800}/>
              </Box>
             </Flex>
            <ExchangeModal />
            <DepositModal />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Page
