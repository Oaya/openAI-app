import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable';
import { Textarea, Button, Box, Text, Flex, Spacer } from '@chakra-ui/react';

import { ApiContext } from '../Provider/ApiContext';
import { languagesList } from '../languageData';
import Error from './Error';
import SubHeading from './SubHeading';

const languagesListObj = languagesList.map(item => ({ label: item.lang, value: item.lang, index: item.index }));

export default function Form() {
  const { getApiResponse, setIsLoading, isLoading } = useContext(ApiContext);
  const queryInputRef = useRef();
  const [option, setOption] = useState([]);
  const [inputError, setInputError] = useState('');

  const { error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText } = useSpeechToText({
      continuous: true,
      useLegacyResults: false,
      speechRecognitionProperties: {
        lang: 'en-US',
        interimResults: true
      }
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    const enteredInput = queryInputRef.current.value;

    if (!enteredInput) {
      setInputError('Please input the sentence.');
      setIsLoading(false);

    } else if (option.length === 0) {
      setInputError("Please set Languages");
      setIsLoading(false)

    } else {
      getApiResponse(enteredInput, option);
      queryInputRef.current.value = '';
      setOption([]);
    };

    setTimeout(() => {
      setInputError('')
    }, 5000);
  };

  const handleChange = (input) => {
    setOption(input);
  };

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
      <Box m='auto' mb='10'>
        {inputError && <Error error={inputError} />}
        <SubHeading text="What languages do you want to translate to :" fontSize={['lg', 'lg', '2xl']} />

        <Creatable
          isMulti
          options={languagesListObj}
          onChange={handleChange}
          value={option}
          placeholder="Select from list or type in here"
        />
      </Box>

      <Flex direction={['column', 'column', 'row']} >
        <SubHeading textAlign={['center', 'center', 'left']} text=" Type the sentence you want to translate or speak it in English :" fontSize={['lg', 'lg', '2xl']} />
        <Spacer />
        <Button width={['100%', '100%', '30%', '20%']}
          my={['5', '5', '3']}
          px={['10', '20', '18', '30']}
          ml={['5', '0', '0']}
          onClick={isRecording ? stopSpeechToText : startSpeechToText} colorScheme='blue' color='white' >
          {isRecording ? "Stop recording" : "Start Recording"}
        </Button>
      </Flex>

      <Textarea

        bg='white'
        type='text'
        ref={queryInputRef}
        value={interimResult}
        size='md'
        placeholder='E.g.  How are you?'
        fontWeight={'bold'}
        color='blackAlpha.700'
      />

      <Box textAlign={['center', 'center', 'right']} my={['5', '5', '3']} >

        {
          isLoading ? (
            <Button
              width={['100%', '100%', '20%']}
              isLoading
              loadingText='Searching..'
              colorScheme='cyan'
              variant='solid'
              color='white'
              px='5'
            >
            </Button>
          ) : (
            <Button
              width={['100%', '100%', '20%']}
              px='10'
              colorScheme='cyan'
              variant='solid'
              onClick={handleSubmit}
              color='white'
            >
              Translate
            </Button>)
        }
      </Box>
    </Box >

  )
}
