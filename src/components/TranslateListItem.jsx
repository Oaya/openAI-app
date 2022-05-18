import { TableContainer, Table, Tr, Tbody, Td, Box } from '@chakra-ui/react'
import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

import TranslateButton from './TranslateButton';

export default function TranslateListItem({ prompt, response, languages, index }) {
  const { voices } = useSpeechSynthesis({});

  return (
    <Box>
      <TableContainer bg={"#C4F1F9"} my={'5'} rounded='md'>
        <Table colorScheme='teal' variant={'unstyled'} >
          <Tbody >
            <Tr >
              <Td p={2} fontSize={'18'} fontWeight={'bold'}>Sentence :</Td>
              <Td p={2} >{prompt}</Td>
            </Tr>
            <Tr>
              <Td p={2} fontSize={'18'} fontWeight={'bold'}>Languages :</Td>
              {languages?.map((res, index) => (
                <Td p={2} key={index}>{res}</Td>
              ))}
            </Tr>
            <Tr>
              <Td p={2} fontSize={'18'} fontWeight={'bold'}>Translations :</Td>
              {response?.map((res, i) => (
                <Td p={2} key={i}>{res}
                  <TranslateButton text={res} voice={voices[index[i]]} />
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
