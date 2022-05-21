import React, { useContext, useState } from 'react'
import { Box } from '@chakra-ui/react';
import SubHeading from '../SubHeading';
import Creatable from 'react-select/creatable';
import { languagesList } from '../../languageData';
import { ApiContext } from '../../Provider/ApiContext';
import SubmitButton from '../Buttons/SubmitButton';
import { FormContext } from '../../Provider/FormContext';

const languagesListObj = languagesList.map(item => ({ label: item.lang, value: item.lang, index: item.index }));

export default function Quiz() {
  const { isLoading } = useContext(ApiContext);
  const { handleSelectChange, handleQuizFormSubmit, option } = useContext(FormContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuizFormSubmit(option)
  }

  return (
    <Box m='auto' mb={['3', '3,', '10']}>
      <SubHeading text="Pick a Language " fontSize={['lg', 'lg', '2xl']} />

      <Creatable
        options={languagesListObj}
        onChange={(option) => handleSelectChange(option)}
        placeholder="Select one from list or type in here"
      />
      {isLoading ?
        (<SubmitButton px='5' isLoading={true} loadingText='Loading..' />)
        : (<SubmitButton px='10' isLoading={false} text='Start' handleSubmit={handleSubmit} />)
      }

    </Box>
  )
}
