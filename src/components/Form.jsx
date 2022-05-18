import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable';
import { Textarea, Button, Box, Text, Flex, Spacer } from '@chakra-ui/react';


import { ApiContext } from '../Provider/ApiContext';
import { languagesList } from '../languageData';
import Error from './Error';


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
      console.log(option);
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
    setInputError("Web Speech API is not available in this browser");
    setTimeout(() => {
      setInputError('')
    }, 5000);
    return <Error error={error} />
  }


  return (
    <Box w='70%' m='auto' my={'8'} >

      <Box m='auto' mb='10'>
        {inputError && <Error error={inputError} />}
        <Text
          py='2'
          fontSize='xl'
          bgGradient="linear(to-l, #6600ff,#0a2269)"
          bgClip="text"
          fontWeight="extrabold"
        >
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
        <Text py='2'
          fontSize='xl'
          bgGradient="linear(to-l, #6600ff,#0a2269)"
          bgClip="text"
          fontWeight="extrabold">
          Type the sentence you want to translate or speak it in English :
        </Text>
        <Spacer />
        <Button onClick={isRecording ? stopSpeechToText : startSpeechToText} colorScheme='telegram' variant='outline' bg="white">
          {isRecording ? "Stop recording" : "Start Recording"}
        </Button>
      </Flex>

      <Textarea
        mt={'1'}
        bg='white'
        type='text'
        ref={queryInputRef}
        value={interimResult}
        size='md'
        placeholder='E.g.  How are you?'
        fontWeight={'bold'}
        color='blackAlpha.700'
      />

      <Box textAlign={'right'} my={'3'} >
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
