//TODO: make a common card here and integrate all the components inside it

'use client'
import React, { useLayoutEffect, useReducer, useState } from 'react'
import { Card, Flex, Text } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar/Sidebar'
import Transaction from '../transactions/Transaction'
import ThirdSection from './ThirdSection'
import DexComponent from '../components/DexComponent'
import SignUpComponent from '../components/Login/SignUpComponent'
import Home from '../components/Dashboard/Home'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const SecondSection = () => {
  return (
    <MemoryRouter>
      <Flex
        w="full"
        h={'full'}
      >
        <Flex w="12%">
          <Sidebar />
        </Flex>
        <Flex
          w="full"
          h="100vh"
          justifyContent={'center'}
        >
          <Flex
            justify="center"
            align="center"
            m={0}
            p={0}
            maxW={'1100px'}
            my={8}
          >
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/signup"
                element={<SignUpComponent />}
              />
              <Route
                path="/exchange"
                element={<ThirdSection />}
              />
              <Route
                path="/dex"
                element={<DexComponent />}
              />
              <Route
                path="/transaction"
                element={<Transaction />}
              />
            </Routes>
          </Flex>
        </Flex>
      </Flex>
    </MemoryRouter>
  )
}

export default SecondSection
