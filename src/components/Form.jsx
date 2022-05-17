import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable';
import { Textarea, Button, Box, Text, Flex, Spacer } from '@chakra-ui/react'


import { ApiContext } from '../Provider/ApiContext';
import { languagesList } from '../languageData';
import Error from './Error';

const languagesListObj = languagesList.map(lang => ({ label: lang, value: lang }));

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
      setIsLoading(false)
      setTimeout(() => {
        setInputError('')
      }, 5000);

    } else if (option.length === 0) {
      setInputError("Please set Languages");
      setIsLoading(false)
      setTimeout(() => {
        setInputError('')
      }, 5000);
    } else {

      getApiResponse(enteredInput, option);
      queryInputRef.current.value = '';
      setOption([]);
      setInputError('');

    };

  };

  const handleChange = (input) => {
    setOption(input);
  };


  //for the case speech to text doesn't work//
  if (error) {
    setInputError("Web Speech API is not available in this browser")
    return <Error error={error} />
  }

  return (
    <Box >
      <Box m='auto' mb='10'>
        {inputError && <Error error={inputError} />}
        <Text py='2' fontSize='xl' fontWeight={'bold'}>
          What languages do you want to translate to :
        </Text>

        <Creatable
          isMulti
          options={languagesListObj}
          onChange={handleChange}
          value={option}
          placeholder="Select from list or type in here"
        />
      </Box>

      <Flex direction={'row'} >
        <Text py='2' fontSize='xl' fontWeight={'bold'}>
          Type the sentence you want to translate or speak it in English :
        </Text>
        <Spacer />
        <Button onClick={isRecording ? stopSpeechToText : startSpeechToText} colorScheme='cyan' variant='outline'>
          {isRecording ? "Stop recording" : "Start Recording"}
        </Button>
      </Flex>

      <Textarea
        type='text'
        ref={queryInputRef}
        value={interimResult}
        size='sm'
        placeholder='E.g.  How are you?'
      />

      <Box mt={'3'} textAlign={'right'} >
        {
          isLoading ? (
            <Button
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
    </Box>

  )
}
