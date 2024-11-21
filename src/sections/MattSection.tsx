import React, { useState } from 'react'
import {
  createClient,
  signAndBroadcastTransaction,
  CallContractTransaction,
} from '../../src/vscClient/client'
import Crypto from 'crypto'
import axios from 'axios'
import { wagmiSigner } from '../../src/vscClient/eth/wagmi'
import { multiConfig } from '../hooks/auth/wagmi-web3modal/config'
import { useAuth } from '../hooks/auth'
import { web3Modal } from '../app/providers'
import { HIVE_PREFIX } from '../hooks/auth/hive'
import { BlockchainActions } from '../hooks/blockchain'
import { Asset } from '../hooks/blockchain/assets'
import { Button } from '@chakra-ui/react'

const API_URL = 'https://api.vsc.eco/api/v1/graphql'
const CONTRACT_ID =
  'vs41q9c3ygqhcuxhu07meg3klwnsfadwfy52dtjjx5s4346d3p7q9684pngr6ug45hvh'

const CallContractButton = () => {
  interface ContractResponse {
    txId: string
    status: string
    returnValue?: any
    state?: any
  }

  const [contractResponse, setContractResponse] =
    useState<ContractResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const transferToContract = async () => {
    setLoading(true)
    setError(null)

    try {
      const auth = useAuth.getState()
      if (!auth.authenticated) throw new Error('Not logged in')
      const method = auth.userId.startsWith(HIVE_PREFIX) ? 'hive' : 'eth'
      const result = await BlockchainActions(
        method,
        'transfer',
        CONTRACT_ID,
        0,
        Asset.HIVE_HIVE,
      )

      console.log('Transaction result:', result)

      setContractResponse({
        txId: result.txId,
        status: 'Transaction submitted successfully',
        returnValue: result,
        state: result,
      })
    } catch (err: any) {
      console.error('Error calling transaction:', err)

      if (err.response) {
        console.error('API response error:', err.response.data)
      } else {
        console.error('Unknown error:', err.message)
      }

      setError(
        err.response?.data?.message || err.message || 'Unknown error occurred',
      )
    } finally {
      setLoading(false)
    }
  }

  const dexDeposit = async () => {
    setLoading(true)
    setError(null)

    try {
      const auth = useAuth.getState()
      if (!auth.authenticated) throw new Error('Not logged in')
      const method = auth.userId.startsWith(HIVE_PREFIX) ? 'hive' : 'eth'
      const result = await BlockchainActions(method, 'depositToDex', 0, 1)

      console.log('Transaction result:', result)

      if (!result.success) {
        throw new Error('Transaction broadcast failed')
      }

      setContractResponse({
        txId: result.txId,
        status: 'Transaction submitted successfully',
        returnValue: result,
        state: result,
      })
    } catch (err: any) {
      console.error('Error calling transaction:', err)

      if (err.response) {
        console.error('API response error:', err.response.data)
      } else {
        console.error('Unknown error:', err.message)
      }

      setError(
        err.response?.data?.message || err.message || 'Unknown error occurred',
      )
    } finally {
      setLoading(false)
    }
  }

  async function getLastOutputTransaction() {
    const STATE_GQL = `
        query MyQuery($contractId: String!) {
            findContractOutput(filterOptions: {
                byContract: $contractId
                limit: 1
            }) {
                outputs {
                    id
                }
            }
        }
    `

    try {
      const { data } = await axios.post(API_URL, {
        query: STATE_GQL,
        variables: {
          contractId: CONTRACT_ID,
        },
      })

      const outputs = data.data?.findContractOutput?.outputs
      if (outputs && outputs.length > 0) {
        return outputs[0].id
      }

      throw new Error('No outputs found for the given contract.')
    } catch (err) {
      console.error('Error fetching last output transaction:', err.message)
      throw err
    }
  }
  const callMatthewAction = async () => {
    setLoading(true)
    setError(null)

    try {
      // gql mutation to call my matthew action
      const queryPayload = {
        query: `
                mutation CallContractAction($contractId: String!, $action: String!, $args: JSON!) {
                    callContractAction(
                        contractId: $contractId
                        action: $action
                        args: $args
                    ) {
                        result {
                            returnValue
                        }
                    }
                }
            `,
        variables: {
          contractId: CONTRACT_ID,
          action: 'matthew',
          args: {}, // no args
        },
      }

      const { data } = await axios.post(API_URL, queryPayload)

      const returnValue = JSON.stringify(data)

      if (!returnValue) {
        throw new Error('Action did not return a valid state.')
      }

      console.log('Result from `matthew` action:', returnValue)

      // get this latest tx call
      const lastOutputId = await getLastOutputTransaction()
      console.log('Last output transaction ID:', lastOutputId)

      setContractResponse({
        txId: lastOutputId,
        status: 'Fetched state successfully',
        returnValue,
      })
    } catch (error) {
      console.error('Error calling `matthew` action:', error)
      setError(
        error.response?.data?.message ||
          error.message ||
          'Unknown error occurred',
      )
    } finally {
      setLoading(false)
    }
  }

  const fetchContractState = async () => {
    setLoading(true)
    setError(null)

    try {
      // prep the payload for calling the contract action
      const queryPayload = {
        query: `
              mutation CallContractAction($contractId: String!, $action: String!, $args: JSON!) {
                  callContractAction(
                      contractId: $contractId
                      action: $action
                      args: $args
                  ) {
                      result {
                          returnValue
                          logs
                      }
                  }
              }
          `,
        variables: {
          contractId: CONTRACT_ID,
          action: 'matthew',
          args: {},
        },
      }

      const { data } = await axios.post(API_URL, queryPayload)

      const returnValue = data?.data?.callContractAction?.result?.returnValue

      console.log("contract state (via 'matthew' action):", returnValue)

      setContractResponse({
        txId: '',
        status: 'Fetched state successfully',
        state: returnValue,
      })
    } catch (error: any) {
      console.error('Error fetching contract state:', error)
      setError(
        error.response?.data?.message ||
          error.message ||
          'Unknown error occurred',
      )
    } finally {
      setLoading(false)
    }
  }

  const readContractState = async () => {
    setLoading(true)
    setError(null)

    try {
      const lastOutputId = await getLastOutputTransaction()
      if (!lastOutputId) {
        throw new Error('No outputs found for the contract.')
      }

      console.log('Last output transaction ID:', lastOutputId)

      const state = await fetchContractState()
      console.log('Fetched contract state:', state)

      setContractResponse({
        txId: lastOutputId, // the last tx ID related to the state
        status: 'Fetched state successfully',
        state,
      })
    } catch (error) {
      console.error('Error fetching contract state:', error)
      setError(error.message || 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={dexDeposit}
        disabled={loading}
      >
        {loading ? 'Executing...' : 'DEX DEPOSIT'}
      </button>
      <br />
      <button
        onClick={callMatthewAction}
        disabled={loading}
      >
        {loading ? 'Executing...' : 'Fetch Matthew State'}
      </button>

      <br />
      <button
        onClick={transferToContract}
        disabled={loading}
      >
        {loading ? 'Executing...' : 'Transfer to Contract'}
      </button>
      <br />
      <button
        onClick={readContractState}
        disabled={loading}
      >
        {loading ? 'Fetching State...' : 'Read Contract State'}
      </button>
      <br />
      <button
        onClick={() => {
          web3Modal.close()
          web3Modal.open({ view: 'Connect' })
        }}
      >
        CONNECT WALLET
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {contractResponse && (
        <div>
          <h3>CONTRACT RESULT</h3>
          <pre>{JSON.stringify(contractResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default CallContractButton
