import React from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export default function Error(props) {
  return (

    <Alert
      status={props.status}
      height={'9'}
      rounded='md'
    >
      <AlertIcon />
      <AlertDescription>{props.text}</AlertDescription>
    </Alert>

  )
}
