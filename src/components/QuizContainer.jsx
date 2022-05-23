import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Stack, Radio, RadioGroup, Button, Alert, AlertIcon } from '@chakra-ui/react';
import uuid from 'react-uuid'
import { ApiContext } from '../Provider/ApiContext';
import EmptyContainer from './EmptyContainer';


export default function QuizContainer() {
  const [pickedAnswer, setPickedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [popUp, setPopUp] = useState();


  const { questionArray, question, answer, finish, setFinish, shuffleAnswers, setQuestionIdx, questionIdx, isLoading, createQuestionAndAnswerFromList } = useContext(ApiContext);

  useEffect(() => {
    console.log(questionIdx)
    if (questionIdx === 5) {
      setFinish(true);
    }
    setTimeout(() => {
      createQuestionAndAnswerFromList(questionArray)
    }, 2000);
  }, [questionIdx])


  console.log(pickedAnswer, answer, shuffleAnswers)
  const handleAnswer = (e) => {
    e.preventDefault();

    if (pickedAnswer === answer) {
      setScore((prev) => prev + 1)
      setPopUp({ text: "You are Correct!! Good Job!", status: 'success' });
    } else {
      setPopUp({ text: `Wrong Answer, ${answer} is correct answer.`, status: "error" });
    }

    setTimeout(() => {
      setPopUp()
    }, 2000);
    //get next question//
    setPickedAnswer('');
    setQuestionIdx((prev => prev + 1));
  }

  return (
    <Box>
      {questionArray.length === 0 || isLoading ? (<EmptyContainer text='Your Quiz will show in here!' />) : finish ? (<EmptyContainer text={`Your Score is ${score}/ 5`} />) : (
        <>
          {popUp && <Alert status={popUp.status}>
            <AlertIcon />
            {popUp.text}
          </Alert>}
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
