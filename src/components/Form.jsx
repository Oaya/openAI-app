import React, { useContext, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable';
import { Textarea, Button } from '@chakra-ui/react'

import { ApiContext } from '../Provider/ApiContext';
import { languagesList } from '../languageData';
import Error from './Error';


const languagesListObj = languagesList.map(lang => ({ label: lang, value: lang }));

export default function Form() {
  const { getApiResponse } = useContext(ApiContext);
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

    const enteredInput = queryInputRef.current.value;

    if (!enteredInput) {
      setInputError('Please input the sentence.')
    } else if (option.length === 0) {
      setInputError("Please set Languages")
    } else {

      console.log(enteredInput, option)
      getApiResponse(enteredInput, option);
      queryInputRef.current.value = '';
      setOption([]);
      setInputError('');
    };
  };

  const handleChange = (input) => {
    setOption(input);
  }

  //for the case speech to text doesn't work//
  if (error) {
    return <p>Web Speech API is not available in this browser</p>
  }

  return (
    <div>
      <div>
        {inputError && <Error error={inputError} />}
        <p>What languages do you want to translate to??</p>

        <Creatable
          isMulti
          options={languagesListObj}
          onChange={handleChange}
          value={option}
          placeholder="Select from list or type in here"
        />

      </div>
      <div>
        <p>
          Enter the sentence you want to translate or speak it in English
        </p>
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop recording" : "Start Recording"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <Textarea type='text' ref={queryInputRef} value={interimResult} />
        <Button colorScheme='teal' variant='solid'>
          Translate
        </Button>
      </form>
    </div>

  )
}
