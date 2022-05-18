import { Button } from '@chakra-ui/react';
import { useSpeechSynthesis } from 'react-speech-kit';
import React from 'react';

export default function TranslateButton({ languageIndex, text }) {
  const { speak, voices } = useSpeechSynthesis({});
  const voice = voices[languageIndex];

  const handleClick = () => {
    speak({ text, voice })
  };

  return (
    <Button onClick={handleClick}> icon</Button>
  )
}
