import { Box, Center } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ApiContext } from '../Provider/ApiContext';
import SubHeading from './SubHeading';
import TranslateListItem from './TranslateListItem';

export default function TranslateList() {
  const { responses } = useContext(ApiContext);
  const reversedRes = [...responses].reverse();

  return (

    <Box w={['82%', '82%', '75%']} m='auto' mb={'10'} >
      <SubHeading text="Your Translation List" fontSize={['2xl', '2xl', '4xl']} textAlign={'center'} />
      {reversedRes.length === 0 ?
        (<Center bg={"#C4F1F9"} rounded='md' height={'40'} my={'5'} fontSize={'lg'} fontWeight={'bold'} >AI will find translations for you here!</Center>)
        : (
          reversedRes.map((res, i) => (
            <TranslateListItem
              key={i}
              prompt={res.prompt}
              response={res.response}
              languages={res.languages}
              index={res.index}
            />
          ))
        )}
    </Box>

  )
}
