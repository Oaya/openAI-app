import React, { useContext, useState } from 'react';
import { Box, Text, Stack, Radio, RadioGroup, Button, Alert, AlertIcon } from '@chakra-ui/react';
import uuid from 'react-uuid'
import { ApiContext } from '../Provider/ApiContext';
import EmptyContainer from './EmptyContainer';

export default function QuizContainer() {

  const [pickedAnswer, setPickedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [popUp, setPopUp] = useState()
  const { questionArray, question, answer, shuffleAnswers } = useContext(ApiContext);


  console.log(question, answer, pickedAnswer);



  const handleAnswer = (e) => {
    e.preventDefault();
    if (pickedAnswer === answer) {
      setScore((prev) => prev + 1)
      setPopUp({ text: "You are Correct!! Good Job!", status: 'success' });
    }
    setPopUp({ text: `Wrong Answer, ${answer} is correct answer.`, status: "error" });
    setTimeout(() => {
      setPopUp()
    }, 5000);
  }


  return (
    <Box>
      {questionArray.length === 0 ? (<EmptyContainer />) : (
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
          <Text>Your Score:{score}</Text>
          <Button width={['100%', '100%', '30%', '20%']}
            my={['5', '5', '3']}
            px={['10', '20', '30']}

            onClick={handleAnswer} colorScheme='blue' color='white' >
            Check
          </Button>

        </>

      )
      }



    </Box >
  )
}
