import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ApiContext } from '../Provider/ApiContext';

export default function ListContainer() {
  const { responses } = useContext(ApiContext);

  return (
    <Box>

      {/* {
        responses.reverse().map((response, i) => (
          <ul key={i}>
            <li>{response.prompt}</li>
            <li>{response.response}</li>
          </ul>
        ))
      } */}
      <ul >
        <li>hi</li>
        <li>hi</li>
      </ul>
    </Box>
  )
}
