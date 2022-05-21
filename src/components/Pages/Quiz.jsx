import React, { useContext, useState } from 'react'
import { Box } from '@chakra-ui/react';
import SubHeading from '../SubHeading';
import Creatable from 'react-select/creatable';
import { languagesList } from '../../languageData';
import { ApiContext } from '../../Provider/ApiContext';
import SubmitButton from '../Buttons/SubmitButton';

const languagesListObj = languagesList.map(item => ({ label: item.lang, value: item.lang, index: item.index }));

export default function Quiz() {


  const { getQuestion, isLoading, language, setLanguage, questionArray } = useContext(ApiContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('click')
    getQuestion(language);
    console.log(questionArray)
  }

  return (
    <Box m='auto' mb={['3', '3,', '10']}>

      <SubHeading text="Pick a Language " fontSize={['lg', 'lg', '2xl']} />

      <Creatable
        options={languagesListObj}
        onChange={(option) => setLanguage(option)}
        placeholder="Select one from list or type in here"
      />
      {isLoading ?
        (<SubmitButton px='5' isLoading={true} loadingText='Loading..' />)
        : (<SubmitButton px='10' isLoading={false} text='Start' handleSubmit={handleSubmit} />)
      }

    </Box>
  )
}
