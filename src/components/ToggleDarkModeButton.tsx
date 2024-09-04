import { Button, Icon } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
import { IoMoon } from 'react-icons/io5'
import { MdSunny } from 'react-icons/md'

export function ToggleDarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button
        onClick={toggleColorMode}
        size={'sm'}
        fontWeight={400}
        fontSize={'xs'}
        lineHeight={'26px'}
      >
        <Icon as={colorMode === 'light' ? IoMoon : MdSunny} />
      </Button>
    </header>
  )
}
