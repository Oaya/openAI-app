
import React, { useContext } from 'react';
import Creatable from 'react-select/creatable';
import { Box } from '@chakra-ui/react';

import { FormContext } from '../../Provider/FormContext';
import { languagesList } from '../../languageData';
import Error from '../Error';
import SubHeading from '../SubHeading';

const languagesListObj = languagesList.map(item => ({ label: item.lang, value: item.lang, index: item.index }));

export default function LanguageInput() {

  const { inputError, option, handleSelectChange } = useContext(FormContext);

  return (
    <Box m='auto' mb={['3', '3,', '10']}>
      {inputError && <Error text={inputError} status="error" />}
      <SubHeading text="What languages do you want to translate to :" fontSize={['lg', 'lg', '2xl']} />

      <Creatable
        isMulti
        options={languagesListObj}
        onChange={(input) => handleSelectChange(input)}
        value={option}
        placeholder="Select from list or type in here"
      />
    </Box>
  )
}
