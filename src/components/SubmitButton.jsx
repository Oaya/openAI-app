import { Button } from '@chakra-ui/react'
import React from 'react'

export default function SubmitButton(props) {
  return (
    <Button
      width={['100%', '100%', '20%']}
      colorScheme='cyan'
      variant='solid'
      color='white'
      px={props.px}
      onClick={props.func()}
    >
      {props.text}
    </Button>
  )
}
