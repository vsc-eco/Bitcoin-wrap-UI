import React from 'react'
import ExchangeModal from './components/ExchangeModal'
import DepositModal from './components/DepositModal'
import Navbar from './components/Navbar'
import { Box, Flex } from "@chakra-ui/react"
import Sidebar from './components/Sidebar'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
      <Navbar />
      <Box bg="brand.50" h="500vh">
        <Flex>
          <Sidebar /> {/* Place Sidebar component inside the Flex container */}
          <Box flex="1"> {/* Add this Box to contain the content */}
            {/* Content of the homepage */}
            <ExchangeModal />
            <DepositModal />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Page
