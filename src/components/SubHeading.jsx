import React from 'react';
import { Textarea, Button, Box, Text, Flex, Spacer, propNames } from '@chakra-ui/react';

export default function SubHeading(props) {
  return (
    <Text
      fontFamily={'heading'}
      py={['1', '1', '2']}
      fontSize={props.fontSize}
      bgGradient="linear(to-l, #6600ff,#0a2269)"
      bgClip="text"
      fontWeight="extrabold"
      textAlign={props.textAlign}
    >
      {props.text}
    </Text>

  )
}
