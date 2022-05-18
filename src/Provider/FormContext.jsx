import React, { createContext, useState, useContext, } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { ApiContext } from './ApiContext';

export const FormContext = createContext();

export default function FormProvider(props) {
  const [inputError, setInputError] = useState('');
  const [option, setOption] = useState([]);
  const { getApiResponse, setIsLoading } = useContext(ApiContext);

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

  const handleSelectChange = (input) => {
    setOption(input);
  };

  const handleFormSubmit = (queryInputRef) => {
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
      queryInputRef.current.value = ''
      setOption([]);
    };

    setTimeout(() => {
      setInputError('')
    }, 5000);
  };

  const providerData = {
    inputError,
    option,
    setInputError,
    setOption,
    handleSelectChange,
    handleFormSubmit,
    error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText

  }
  return <FormContext.Provider value={providerData}>{props.children}</FormContext.Provider>
}