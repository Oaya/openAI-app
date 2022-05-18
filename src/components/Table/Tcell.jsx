import React from 'react'
import { Td } from '@chakra-ui/react'

export default function Tcell(props) {
  return (
    <Td p={[1, 1, 2]} fontSize={['12', '15', '18']} fontWeight={props.weight}>{props.text}</Td>
  )
}
