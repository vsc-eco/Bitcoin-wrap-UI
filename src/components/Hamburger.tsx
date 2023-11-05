"use client"
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open sidebar"
        onClick={isOpen ? onClose : onOpen}
      />
    </>
  );
}

export default Hamburger;
