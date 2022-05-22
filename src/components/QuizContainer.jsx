import React, { useContext, useState } from 'react';
import { Box, Text, Stack, Radio, RadioGroup } from '@chakra-ui/react';
import uuid from 'react-uuid'
import { ApiContext } from '../Provider/ApiContext';
import EmptyContainer from './EmptyContainer';

const shuffleList = (list) => list.sort(() => Math.random() - 0.5);


export default function QuizContainer() {

  const [value, setValue] = useState(0)
  const { questionArray, answerChoice, question, answer } = useContext(ApiContext);

  const shuffleAnswers = shuffleList([...answerChoice]);
  console.log(answerChoice, question, answer)


  return (
    <Box>
      {questionArray.length === 0 ? (<EmptyContainer />) : (
        <>
          <Text>Pick the correct one from choice?</Text>
          <Text>{question}</Text>
          <RadioGroup onChange={setValue} value={value} colorScheme='cyan'>
            <Stack direction='column'>
              {shuffleAnswers.map((answer) => (
                <Radio key={uuid()} value={answer} >{answer}</Radio>
              ))}

            </Stack>
          </RadioGroup>
        </>

      )
      }



    </Box >
  )
}
