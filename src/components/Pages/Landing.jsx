import React from 'react';
import MenuButton from '../Buttons/MenuButton';
import { Flex } from '@chakra-ui/react';

export default function Landing() {
  return (
    <>
      <Flex direction={'row'} align={"center"} justify={"center"} mt={'100'}>
        <MenuButton text="Quiz Mode" href="/quiz" />
        <MenuButton text="Translate Mode" href="/translate" />
      </Flex>
    </>
  )
}
