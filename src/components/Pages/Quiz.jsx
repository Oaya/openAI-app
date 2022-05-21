import React, { useContext, useState } from 'react'
import { Box } from '@chakra-ui/react';
import SubHeading from '../SubHeading';
import Creatable from 'react-select/creatable';
import { languagesList } from '../../languageData';
import MenuButton from '../Buttons/MenuButton';
import { ApiContext } from '../../Provider/ApiContext';

const languagesListObj = languagesList.map(item => ({ label: item.lang, value: item.lang, index: item.index }));

export default function Quiz() {

  const [language, setLanguage] = useState('');
  const { getQuestion } = useContext(ApiContext);



  const handleSubmit = (e) => {
    e.preventDefault();
    getQuestion(language)
  }

  return (
    <Box m='auto' mb={['3', '3,', '10']}>

      <SubHeading text="Pick a Language " fontSize={['lg', 'lg', '2xl']} />
      <form onSubmit={handleSubmit} >
        <Creatable
          options={languagesListObj}
          onChange={(option) => setLanguage(option)}
          placeholder="Select one from list or type in here"
        />
        <MenuButton text="start" />
      </form>
    </Box>
  )
}
