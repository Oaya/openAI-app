import { TableContainer, Table, Tr, Tbody, Td } from '@chakra-ui/react'
import React from 'react'

export default function TranslateListItem({ prompt, response, languages }) {

  return (
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

  )
}
