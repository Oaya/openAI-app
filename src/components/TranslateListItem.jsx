import { TableContainer, Table, Tr, Tbody, Td, Button, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';

export default function TranslateListItem({ prompt, response, languages }) {
  const [value, setValue] = useState('How are you?');
  const { speak } = useSpeechSynthesis();


  return (
    <Box>
      <Button onClick={() => speak({ text: value })}>speak</Button>
      <TableContainer bg={"#C4F1F9"} my={'5'} rounded='md'>
        <Table colorScheme='teal' variant={'unstyled'} >
          <Tbody >
            <Tr >
              <Td p={2} fontSize={'18'} fontWeight={'bold'}>Sentence :</Td>
              <Td p={2} >{prompt}</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td p={2} fontSize={'18'} fontWeight={'bold'}>Languages :</Td>
              {languages?.map((res, i) => (
                <Td p={2}>{res}</Td>
              ))}
            </Tr>
            <Tr>
              <Td p={2} fontSize={'18'} fontWeight={'bold'}>Translations : </Td>
              {response?.map((res, i) => (
                <Td p={2}>{res}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>

  )
}
