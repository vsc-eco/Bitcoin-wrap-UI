import { Flex } from '@chakra-ui/react'
import React from 'react'
import Dashboard from './Dashboard'
import AccountComponent from './AccountComponent'
import { useAuth } from '../../hooks/auth'
import { readableUsername } from '../Sidebar/UserInfo'

type Props = {}

const Home = (props: Props) => {
  const auth = useAuth()

  const userId = auth.authenticated ? auth.userId : ''
  const username = readableUsername(userId)

  return (
    <Flex align="end">
      <Dashboard username={username} />
      <AccountComponent username={username} />
    </Flex>
  )
}

export default Home
