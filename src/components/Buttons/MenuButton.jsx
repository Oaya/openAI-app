import { Box } from '@chakra-ui/react'
import React from 'react';

export default function MenuButton(props) {
  return (
    <Box
      p={'2'}
      m={'5'}
      as='button'
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
      width={['100%', '100%', '20%']}
      borderRadius='10px'
      fontSize={'30'}
      bgGradient="linear(to-l,#097279,#2c149b)"
      color='white'
      _hover={{ bg: '#2c149b' }}
      _active={{
        bg: '#17017e',
        transform: 'scale(0.98)',
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
    >
      <a href={props.href}> {props.text}</a>
    </Box>
  )
}