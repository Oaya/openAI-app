import React from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export default function Error(props) {
  return (

    <Alert
      status='error'
      height={'9'}
      rounded='md'
    >
      <AlertIcon />
      <AlertDescription>{props.error}</AlertDescription>
    </Alert>

  )
}
