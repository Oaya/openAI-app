import React, { useContext, useRef, useState } from 'react';
import { ApiContext } from '../Provider/ApiContext';
import useSpeechToText from 'react-hook-speech-to-text';
import Creatable from 'react-select/creatable';

const languagesList = [
  "Arabic",
  "Chinese ",
  "Czech",
  "Dutch",
  "English",
  "French",
  "German",
  "Greek",
  "Hindi",
  "Irish",
  "Italian",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Vietnamese",
];
const languagesListObj = languagesList.map(lang => ({ label: lang, value: lang }));

export default function Form() {

  const { getApiResponse } = useContext(ApiContext);
  const queryInputRef = useRef();
  const [typedLang, setTypedLang] = useState('')

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
    //search function from context//
    const enteredInput = queryInputRef.current.value;
    getApiResponse(enteredInput);
    queryInputRef.current.value = '';
  }

  const handleChange = (input) => {
    console.log(input)
    setTypedLang(input)
  }

  if (error) {
    return <p>Web Speech API is not available in this browser</p>
  }

  return (
    <div>
      <div>
        <p>What language do you want to translate to??</p>

        <Creatable
          isMulti
          options={languagesListObj}
          onChange={handleChange}
          value={typedLang}
          placeholder="Select from list or type in here"
        />


      </div>
      <div>
        <p>
          Enter the sentence you want to translate or talk speak it in English
        </p>
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "stop recording" : "start Recording"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea type='text' ref={queryInputRef} value={interimResult} />
        <button >Search</button>
      </form>
    </div>

  )
}
