//TODO: In Dex Component make the spinner animated once getting the values
//TODO: rename the components to swap and liquidity
import React, { useState } from 'react'
import { Box, Button, ButtonGroup, Flex, VStack, Text } from '@chakra-ui/react'
import styles from './DexComponent.module.css'

import TokenSearchModal from './TokenSearchModal'

//importing the components
import LiquidityInterface from './liquidity/LiquidityInterface'
import SwapComponent from './Swap/SwapComponent'
import HivePrice from './HivePrice'
import WBTC from './WBTC'
import MattSection from '../sections/MattSection'

const DexComponent = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'liquidity'>('swap')

  //make the hookstate for rendering the transfer token modal
  const [showModal, setShowModal] = useState<boolean>(false)
  const [token, setToken] = useState('')

  //make a function handleChange for the transfer token modal
  const handleOpen = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Flex
      alignItems={'center'}
      className={styles.parent_container}
    >
      <VStack
        w={['700px']}
        borderRadius="md"
        spacing={2}
      >
        <ButtonGroup
          isAttached
          className={styles.toggleButton}
        >
          <Button
            borderRadius={'3xl'}
            w={24}
            bgColor={activeTab === 'swap' ? '#5266eb' : '#edf2f7'}
            variant={activeTab === 'swap' ? 'solid' : 'outline'}
            color={activeTab === 'swap' ? 'white' : '#5266eb'}
            border={'transparent'}
            onClick={() => setActiveTab('swap')}
          >
            <Text className={styles.button_text}>Swap</Text>
          </Button>
          <Button
            borderRadius={'3xl'}
            w={24}
            bgColor={activeTab === 'liquidity' ? '#5266eb' : '#edf2f7'}
            variant={activeTab === 'liquidity' ? 'solid' : 'outline'}
            color={activeTab === 'liquidity' ? 'white' : '#5266eb'}
            border={'transparent'}
            onClick={() => setActiveTab('liquidity')}
          >
            <Text className={styles.button_text}>Liquidity</Text>
          </Button>
        </ButtonGroup>

        <Flex
          w={'600px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {activeTab === 'swap' && (
            <Box>
              <SwapComponent
                showModal={showModal}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
              {/* TODO move into Swap */}
              <HivePrice
                coin={'HIVE'}
                image={'hive.svg'}
              />
              <HivePrice
                coin={'HBD'}
                image={'hbd_green.svg'}
              />
            </Box>
          )}

          <TokenSearchModal
            isOpen={showModal}
            onClose={handleClose}
            setToken={setToken}
          />

          {activeTab === 'liquidity' && (
            <LiquidityInterface
              showModal={showModal}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          )}
        </Flex>
        <MattSection />
      </VStack>
    </Flex>
  )
}

export default DexComponent
