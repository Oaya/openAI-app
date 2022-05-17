import React from 'react';
import { Heading, Text, Box, Center } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box pt='10' pb='10'>
      <Center>
        <Heading as='h1' size='2xl'>
          Hello, World!
        </Heading>
      </Center>
      <Center>
        <Text fontSize='lg'>~Learn Languages with AI~</Text>
      </Center>
    </Box>


  )
}
