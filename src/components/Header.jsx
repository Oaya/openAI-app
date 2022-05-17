import React from 'react';
import { Heading, Text, Center, Box } from '@chakra-ui/react';

export default function Header() {
  return (
    <div className="heading">
      <Box
        bgGradient="linear(to-b,#0a2269, #6600ff)"
        bgClip="text"
        fontWeight="extrabold">
        <Center>
          <Heading as='h1' size='2xl'  >
            Hello, World!
          </Heading>
        </Center>
        <Center>
          <Text fontSize='lg' >~Learn Languages with AI~</Text>
        </Center>
      </Box>
    </div>
  )
}
