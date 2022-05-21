import React, { useContext, useState } from 'react';
import { Box, Text, Stack, Radio, RadioGroup } from '@chakra-ui/react';
import { questionList } from '../languageData';
import { ApiContext } from '../Provider/ApiContext';
import EmptyContainer from './EmptyContainer';

const shuffleList = (list) => [...list].sort(() => Math.random() - 0.5);
const shuffleQuestionsList = shuffleList(questionList);

export default function QuizContainer() {
  const [question, setQuestion] = useState(shuffleQuestionsList[0]);
  const [value, setValue] = React.useState('1');
  const { questionArray } = useContext(ApiContext);
  const [answerChoice, setAnswerChoice] = useState([]);

  console.log(questionList, shuffleQuestionsList, questionArray, question);

  //get the correct answer//
  const answerIndex = questionList.findIndex((item) => (item === question));
  console.log(questionArray[answerIndex]);
  //function create choice//


  const shuffleAnswersList = shuffleList(questionArray);
  console.log(questionArray.splice(answerIndex, 1), questionArray, shuffleAnswersList);
  //onclick check the result//
  //and move to next question//

  return (
    <Box>
      {questionArray.length === 0 ? (<EmptyContainer />) : (
        <>
          <Text>Pick the correct one from choice?</Text>
          <Text>{question}</Text>
          <RadioGroup onChange={setValue} value={value} colorScheme='cyan'>
            <Stack direction='column'>
              <Radio value='1' >First</Radio>
              <Radio value='2' >Second</Radio>
              <Radio value='3' >Third</Radio>
            </Stack>
          </RadioGroup>
        </>

      )
      }



    </Box >
  )
}
