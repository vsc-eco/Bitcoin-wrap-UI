import React from 'react'
import ExchangeModal from './components/ExchangeModal'
import DepostiModal from './components/DepositModal'
import Navbar from './components/Navbar'
import {Box} from "@chakra-ui/react"
type Props = {}

const page = (props: Props) => {
  return (
    <>
    <Navbar  />
    <Box bg="brand.50" h="500vh">
    <ExchangeModal />
    <DepostiModal />
    </Box>
    </>
  )
}

export default page