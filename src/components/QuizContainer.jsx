import React, { useContext, useState } from 'react';
import { Box, Text, Stack, Radio, RadioGroup } from '@chakra-ui/react';

import { ApiContext } from '../Provider/ApiContext';
import EmptyContainer from './EmptyContainer';

const shuffleList = (list) => list.sort(() => Math.random() - 0.5);
// const questionsList = [...questionList];
// const shuffleQuestionsList = shuffleList(questionsList);

export default function QuizContainer() {
  // const [question, setQuestion] = useState(shuffleQuestionsList[0]);
  const [value, setValue] = useState(0)
  const { questionArray, answerChoice } = useContext(ApiContext);

  const shuffleAnswers = shuffleList([...answerChoice])


  return (
    <Box>
      {questionArray.length === 0 ? (<EmptyContainer />) : (
        <>
          <Text>Pick the correct one from choice?</Text>
          <Text></Text>
          <RadioGroup onChange={setValue} value={value} colorScheme='cyan'>
            <Stack direction='column'>
              {shuffleAnswers.map((answer) => (
                <Radio key={answer} value={answer} >{answer}</Radio>
              ))}

            </Stack>
          </RadioGroup>
        </>

      )
      }



    </Box >
  )
}
