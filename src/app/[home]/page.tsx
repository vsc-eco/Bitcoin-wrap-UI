import React from 'react'
import ExchangeModal from '../components/ExchangeModal'
import DepostiModal from '../components/DepostiModal'


type Props = {}

const page = (props: Props) => {
  return (
    <>
    <div>This is the page that we are talking about!</div>
    <ExchangeModal />
    <DepostiModal />
    </>
  )
}

export default page