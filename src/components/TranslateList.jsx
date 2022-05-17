import { Box, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ApiContext } from '../Provider/ApiContext';
import TranslateListItem from './TranslateListItem';

export default function TranslateList() {
  const { responses } = useContext(ApiContext);
  console.log(responses)

  return (
    <Box>
      <Heading as='h2' size='lg'>
        Here are Your Translated List
      </Heading>
      {
        responses.reverse().map((res, i) => (
          <TranslateListItem

            key={i}
            prompt={res.prompt}
            response={res.response}
            languages={res.languages}

          />
        ))
      }

    </Box>
  )
}
