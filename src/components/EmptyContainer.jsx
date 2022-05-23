import React from 'react';
import { Center } from '@chakra-ui/react';

export default function EmptyContainer(props) {
  return (
    <Center bg={"#C4F1F9"} rounded='md' height={'40'} my={'5'} fontSize={'lg'} fontWeight={'bold'} >{props.text}</Center>
  )
}
