import React from 'react'
import ExchangeModal from '../components/ExchangeModal'
import DepostiModal from '../components/DepositModal'
import Navbar from '../components/Navbar'


type Props = {}

const page = (props: Props) => {
  return (
    <>
    <Navbar />
    <ExchangeModal />
    <DepostiModal />
    </>
  )
}

export default page