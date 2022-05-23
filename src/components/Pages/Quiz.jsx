import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react';
import SubHeading from '../SubHeading';
import Creatable from 'react-select/creatable';
import { languagesList } from '../../languageData';
import { ApiContext } from '../../Provider/ApiContext';
import SubmitButton from '../Buttons/SubmitButton';
import { FormContext } from '../../Provider/FormContext';
import QuizContainer from '../QuizContainer';

const languagesListObj = languagesList.map(item => ({ label: item.lang, value: item.lang, index: item.index }));

export default function Quiz() {
  const { isLoading } = useContext(ApiContext);
  const { handleSelectChange, handleQuizFormSubmit, option } = useContext(FormContext)
  const { setFinish, setQuestionIdx } = useContext(ApiContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinish(false);
    setQuestionIdx(0)
    handleQuizFormSubmit(option)
  }

  return (
    <Box m='auto' my={['3', '3,', '10']} w={['82%', '82%', '75%']}>
      <SubHeading text="Pick a Language " fontSize={['lg', 'lg', '3xl']} />

      <Creatable
        options={languagesListObj}
        onChange={(option) => handleSelectChange(option)}
        placeholder="Select one from list or type in here"
      />
      <Box textAlign={['center', 'center', 'right']} my={['5', '5', '3']} >
        {isLoading ?
          (<SubmitButton px='5' isLoading={true} loadingText='Loading..' />)
          : (<SubmitButton px='10' isLoading={false} text='Start' handleSubmit={handleSubmit} />)
        }
      </Box>
      <QuizContainer />
    </Box>
  )
}
