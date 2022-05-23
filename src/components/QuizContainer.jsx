import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Stack, Radio, RadioGroup, Button } from '@chakra-ui/react';
import uuid from 'react-uuid'
import { ApiContext } from '../Provider/ApiContext';
import EmptyContainer from './EmptyContainer';

import Error from './Error';
import { FormContext } from '../Provider/FormContext';


export default function QuizContainer() {
  const [pickedAnswer, setPickedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [popUp, setPopUp] = useState();
  const { inputError, setInputError } = useContext(FormContext);

  const { questionArray, question, answer, finish, setFinish, shuffleAnswers, setQuestionIdx, questionIdx, isLoading, createQuestionAndAnswerFromList } = useContext(ApiContext);

  useEffect(() => {

    if (questionIdx === 5) {
      setTimeout(() => {
        setFinish(true);
      }, 3000);

    }
    setTimeout(() => {
      createQuestionAndAnswerFromList(questionArray)
    }, 2000);
  }, [questionIdx])


  const handleAnswer = (e) => {
    e.preventDefault();

    if (!pickedAnswer) {
      setInputError("You need pick answer from the list ")
    } else {

      if (pickedAnswer === answer) {
        setScore((prev) => prev + 1)
        setPopUp({ text: "You are Correct!! Good Job!", status: 'success' });
      } else {
        setPopUp({ text: `Correct answer is ${answer} `, status: "error" });
      }

      //get next question//
      setPickedAnswer('');
      setQuestionIdx((prev => prev + 1));
    }

    setTimeout(() => {
      setPopUp()
      setInputError('')
    }, 2000);

  }

  return (
    <Box>
      {questionArray.length === 0 || isLoading ? (<EmptyContainer text='Your Quiz will show in here!' />) : finish ? (<EmptyContainer text={`Your Score is ${score}/ 5`} />) : (
        <>
          {popUp &&
            <Error status={popUp.status} text={popUp.text} />
          }
          {inputError && <Error text={inputError} status="error" />}
          <Text>Pick the correct one from choice?</Text>
          <Text>{question}</Text>

          <RadioGroup onChange={setPickedAnswer} value={pickedAnswer} colorScheme='cyan'>
            <Stack direction='column'>
              {shuffleAnswers.map((answer) => (
                <Radio key={uuid()} value={answer} >{answer}</Radio>
              ))}

            </Stack>
          </RadioGroup>
          <Text>Your Score:{score}/ 5</Text>
          <Button width={['100%', '100%', '30%', '20%']}
            my={['5', '5', '3']}
            px={['10', '20', '30']}

            onClick={handleAnswer} colorScheme='blue' color='white' >
            Check
          </Button>
        </>
      )
      }
    </Box>
  )
}
