//TODO: add a functionality here to hover the component and show the copy to clopboard button

import { Card, Flex, Text, IconButton, Button } from '@chakra-ui/react'
import React from 'react'
import { BiTransferAlt } from 'react-icons/bi'
import AccountData from './AccountData'
import { accountData } from '../../types/types'

type Props = {
  username: string
}

const AccountsData = [
  {
    id: 1,
    name: 'Hive',
    price: '1209',
    decimalValue: '23',
    image: './hive.svg',
  },
  {
    id: 2,
    name: 'HBD',
    price: '3121',
    decimalValue: '23',
    image: 'hbd_green.svg',
  },
]

const AccountComponent = ({ username }: Props) => {
  return (
    <Card
      mx={['0', '0', '1', '3']}
      w={391}
      h={481}
    >
      <Flex
        w="full"
        px={3}
        align="center"
        justify="space-between"
      >
        <Text fontWeight="bolder">Accounts</Text>
        <Button
          aria-label={'Transfer'}
          variant={'circle'}
        >
          <BiTransferAlt />
        </Button>
      </Flex>
      {AccountsData.map((item: accountData) => (
        <AccountData
          key={item.id}
          item={item}
        />
      ))}
    </Card>
  )
}

export default AccountComponent
