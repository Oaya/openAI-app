import { Button } from '@chakra-ui/react';
import { useSpeechSynthesis } from 'react-speech-kit';
import React from 'react';
import { AiFillSound } from 'react-icons/ai';

export default function TranslateButton({ voice, text }) {
  const { speak } = useSpeechSynthesis();

  return (
    <Button onClick={() => speak({ text, voice })} colorScheme='telegram' size='xs' ml={'3'}><AiFillSound /></Button>
  )
}
