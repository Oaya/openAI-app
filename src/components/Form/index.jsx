import React, { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import Error from '../Error';
import LanguageInput from './LanguageInput';
import { FormContext } from '../../Provider/FormContext';
import SentenceInput from './SentenceInput';



export default function Form() {

  const { setInputError, error } = useContext(FormContext);
  //for the case speech to text doesn't work//

  if (error) {
    setInputError("Web Speech API is not available in this browser");
    setTimeout(() => {
      setInputError('')
    }, 5000);
    return <Error error={error} />
  }

  return (
    <Box w={['82%', '82%', '75%']} m='auto' my={['5,', '5', '8']} >
      <LanguageInput />
      <SentenceInput />
    </Box>

  )
}
