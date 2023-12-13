//TODO: update this compoenent as well
import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

const LiquidityInterface = () => {
  const [tokenAmount, setTokenAmount] = useState<{ [key: string]: string }>({
    HBD: '',
    BTC: '',
  });

  const handleTokenChange = (token: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount({
      ...tokenAmount,
      [token]: event.target.value,
    });
  };

  const handleMax = (token: string) => {
    // You need to replace this with the actual max balance
    const maxBalances = {
      HBD: '0.28957553',
      BTC: '129.978543',
    };
    setTokenAmount({
      ...tokenAmount,
      [token]: maxBalances[token],
    });
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box maxW={"600px"} bg={bgColor} p={4} borderRadius="md" boxShadow="base" background="#f5f9fa">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              <InputGroup>
                <Select placeholder="Select token">
                  <option value="HBD">HBD</option>
                  <option value="BTC">BTC</option>
                </Select>
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => handleMax('HBD')}>
                    Max
                  </Button>
                </InputRightElement>
                <Input
                  placeholder="Amount"
                  value={tokenAmount['HBD']}
                  onChange={handleTokenChange('HBD')}
                />
              </InputGroup>
              <ButtonGroup isAttached width="full">
                <Button onClick={() => handleMax('HBD')} flex="1">
                  Max
                </Button>
                <Button onClick={() => setTokenAmount({ ...tokenAmount, HBD: (parseFloat(tokenAmount.HBD) / 2).toString() })} flex="1">
                  Half
                </Button>
              </ButtonGroup>
              <Divider borderColor={borderColor} />
              <Stat>
                <StatLabel>Pool Liquidity (HBD)</StatLabel>
                <StatNumber>56,258.97 HBD</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pool Liquidity (BTC)</StatLabel>
                <StatNumber>3,577,468.33 BTC</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>LP Supply</StatLabel>
                <StatNumber>79,333.77 LP</StatNumber>
              </Stat>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LiquidityInterface;
