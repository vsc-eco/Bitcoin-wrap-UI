import {
  Button,
  Text,
  Input,
  Flex,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  InputLeftElement,
  Select,
  Spinner,
} from '@chakra-ui/react'

import React, { useState } from 'react'
import { getOutputs, useCreateTx } from '../hooks/VSC'
import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
import { DHive } from '../const'

import styles from './TransferModal.module.css'
import { useAuth } from '../hooks/auth'

const V4VAPP_API = 'https://api.v4v.app'

type Props = {
  refetch: Function
}

const BuyModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('hive')
  const [status, setStatus] = useState<'idle' | 'loading' | 'waiting'>('idle')
  const [payDetails, setDetails] = useState<{
    qr_code: string
    invoice_id: string
    amount: number
  } | null>(null)
  const [checkerId, setCheckerId] = useState<number | null>(null)

  const isAmountValid = amount.trim() !== '' && /^\d*\.?\d*$/.test(amount)
  const isTokenValid = token.trim() !== ''

  const isPlentyAmount = Number(amount) >= 2

  const auth = useAuth()

  const closeAndReset = () => {
    setStatus('idle')
    setAmount('')
    setToken('hive')
    setDetails(null)
    onClose()
    clearInterval(checkerId as unknown as number)
    setCheckerId(null)
  }

  const handleContinue = async () => {
    if (!auth.authenticated) return
    if (!isAmountValid || !isPlentyAmount || !isTokenValid) return

    const splitUserId = auth.userId.split(':')
    setStatus('loading')
    const ret = await Axios.get(
      `${V4VAPP_API}/v1/new_invoice_hive?hive_accname=vsc.gateway&amount=${amount}&currency=${token.toUpperCase()}&receive_currency=${token}&usd_hbd=false&app_name=vsc.network&expiry=600&message=to%3D${splitUserId[splitUserId.length - 1]}&qr_code=base64_png`,
    )

    console.log(ret)

    setDetails({
      invoice_id: ret.data.payment_hash,
      qr_code: `data:image/png;base64,${ret.data.qr_code_base64}`,
      amount: ret.data.amount,
    })

    setStatus('waiting')

    let pid = setInterval(async () => {
      const checkBody = await Axios.get(
        `${V4VAPP_API}/v1/check_invoice/${ret.data.payment_hash}`,
      )

      if (checkBody.data.paid === true) {
        clearInterval(pid)
        onClose()
      }
    }, 1000)
    setCheckerId(pid as unknown as number)
  }

  React.useEffect(() => {
    return () => {
      if (checkerId) {
        clearInterval(checkerId)
      }
    }
  }, [checkerId])

  return (
    <>
      <Button
        variant="outline"
        onClick={onOpen}
        fontSize="xs"
        borderRadius="3xl"
        mx={2}
      >
        Buy
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeAndReset}
      >
        <ModalOverlay />
        <ModalContent className={styles.murPrompt}>
          <ModalHeader>Buy Hive</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === 'waiting' ? (
              <>
                <img
                  src={payDetails!.qr_code}
                  alt="Lightning QR Code"
                ></img>
                <Text
                  textAlign="justify"
                  style={{
                    //Not supported in <Text> props
                    textAlignLast: 'center',
                  }}
                >
                  Scan QR code with lightning network compatible wallet.
                </Text>
                <Text
                  textAlign="justify"
                  style={{
                    textAlignLast: 'center',
                  }}
                >
                  {payDetails!.amount / 100_000_000} BTC
                </Text>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.1em"
                  >
                    $
                  </InputLeftElement>
                  <Input
                    placeholder="0.00"
                    isRequired
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    isInvalid={!isAmountValid}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleContinue()
                      }
                    }}
                  />
                </InputGroup>

                <Select
                  marginLeft="2.5%"
                  placeholder="Select Asset"
                  onChange={e => {
                    setToken(e.target.value)
                  }}
                  value={token}
                >
                  <option value="hive">Hive</option>
                  <option value="hbd">Hive Dollar</option>
                </Select>
              </div>
            )}

            {!isAmountValid && (
              <Text
                color="tomato"
                fontSize={'smaller'}
                px={2}
              >
                Please enter a valid amount
              </Text>
            )}
            {!isPlentyAmount && (
              <Text
                color="tomato"
                fontSize={'smaller'}
                px={2}
              >
                Amount must be atleast 2 {token}
              </Text>
            )}

            {false ? (
              <Text
                color="tomato"
                fontSize={'smaller'}
                px={2}
              >
                Too low balance!
              </Text>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={closeAndReset}
              className={`${styles.murButton} ${styles.murButtonSecondary}`}
            >
              Cancel
            </Button>
            {status !== 'waiting' ? (
              <Button
                isDisabled={
                  !isAmountValid ||
                  !isPlentyAmount ||
                  !isTokenValid ||
                  status === 'loading'
                }
                colorScheme="blue"
                mr={3}
                onClick={handleContinue}
                className={`${styles.murButton} ${styles.murButtonPrimary}`}
              >
                {status === 'loading' ? <Spinner /> : 'Continue'}
              </Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BuyModal
