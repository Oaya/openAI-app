import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { Textarea, Button, Box, Flex, Spacer } from '@chakra-ui/react';

import { ApiContext } from '../Provider/ApiContext';
import Error from './Error';
import SubHeading from './SubHeading';
import LanguageInput from './Form/LanguageInput';
import { FormContext } from '../Provider/FormContext';
import SentenceInput from './Form/SentenceInput';



export default function Form() {
  const { getApiResponse, setIsLoading, isLoading } = useContext(ApiContext);
  const { setInputError, option, setOption, error } = useContext(FormContext);
  const queryInputRef = useRef();



  // const { error,
  //   interimResult,
  //   isRecording,
  //   startSpeechToText,
  //   stopSpeechToText } = useSpeechToText({
  //     continuous: true,
  //     useLegacyResults: false,
  //     speechRecognitionProperties: {
  //       lang: 'en-US',
  //       interimResults: true
  //     }
  //   });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true)

  //   let enteredInput = queryInputRef.current.value;

  //   if (!enteredInput) {
  //     setInputError('Please input the sentence.');
  //     setIsLoading(false);

  //   } else if (option.length === 0) {
  //     setInputError("Please set Languages");
  //     setIsLoading(false)

  //   } else {
  //     getApiResponse(enteredInput, option);
  //     enteredInput = '';
  //     setOption([]);
  //   };

  //   setTimeout(() => {
  //     setInputError('')
  //   }, 5000);
  // };


  //for the case speech to text doesn't work//
  if (error) {
    setInputError("Web Speech API is not available in this browser");
    setTimeout(() => {
      setInputError('')
    }, 5000);
    return <Error error={error} />
  }

  return (
    <Box w={['82%', '82%', '75%']} m='auto' my={['5,', '5', '8']} >

      <LanguageInput />
      <SentenceInput />

    </Box>

  )
}
