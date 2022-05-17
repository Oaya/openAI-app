import { Box } from '@chakra-ui/react'
import React from 'react'

export default function TranslateListItem(props) {
  return (
    <Box>
      <ul>
        <li>{props.prompt}</li>
        <li>{props.response}</li>
      </ul>
    </Box>
  )
}
