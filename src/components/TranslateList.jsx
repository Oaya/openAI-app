import { Box, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ApiContext } from '../Provider/ApiContext';
import TranslateListItem from './TranslateListItem';

export default function TranslateList() {
  const { responses } = useContext(ApiContext);

  return (
    <Box>
      <Box w='70%' m='auto' mb={'10'} >
        <Heading
          as='h2'
          size='lg'
          bgGradient="linear(to-l, #6600ff,#0a2269)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Here are Your Translated List :
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
    </Box>
  )
}
