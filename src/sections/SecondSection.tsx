//TODO: make a common card here and integrate all the components inside it

'use client'
import React, { useLayoutEffect, useReducer, useState } from 'react'
import { Box, Card, Flex, Text } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar/Sidebar'
import Transaction from '../transactions/Transaction'
import ThirdSection from './ThirdSection'
import DexComponent from '../components/DexComponent'
import SignUpComponent from '../components/Login/SignUpComponent'
import Home from '../components/Dashboard/Home'
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom'
import CompanyProfile from '../components/settings/companyProfile'
import Interface from '../components/settings/Interface'

const SecondSection = () => {
  return (
    <MemoryRouter>
      <Flex
        w="full"
        h={'full'}
      >
        <Box>
          <Flex
            w="12%"
            height="100vh"
          >
            <Sidebar />
          </Flex>
        </Box>

        <Flex
          w="full"
          h="100vh"
          justifyContent={'center'}
          display="flex"
        >
          <Flex
            justify="center"
            align="center"
            m={0}
            p={0}
            maxW={'1100px'}
            my={8}
            position="relative"
            width="100%"
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
              <Route path="/settings">
                <Route
                  path=""
                  index
                  element={<Navigate to="/settings/account-profile" />}
                />
                <Route
                  path="/settings/account-profile"
                  element={<CompanyProfile />}
                />
                <Route
                  path="/settings/interface"
                  element={<Interface />}
                />
              </Route>
            </Routes>
          </Flex>
        </Flex>
      </Flex>
    </MemoryRouter>
  )
}

export default SecondSection
