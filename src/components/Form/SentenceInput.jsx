import React, { useContext, useRef } from "react";
import {
  Textarea,
  Button,
  Box,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import SubHeading from "../SubHeading";
import { ApiContext } from "../../Provider/ApiContext";
import { FormContext } from "../../Provider/FormContext";
import SubmitButton from "../Buttons/SubmitButton";

export default function SentenceInput() {
  const { isLoading } = useContext(ApiContext);
  const {
    handleTranslateFormSubmit,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useContext(FormContext);
  const queryInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTranslateFormSubmit(queryInputRef);
  };

  return (
    <>
      <Flex
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
      >
        <SubHeading
          textAlign={["center", "center", "left"]}
          text=" Type or speak the sentence you want to translate in English :"
          fontSize={["lg", "lg", "2xl"]}
        />
        <Button
          width={["100%", "100%", "30%", "20%"]}
          mb={["5", "5", "3"]}
          px={["10", "20", "30"]}
          onClick={
            isRecording
              ? stopSpeechToText
              : startSpeechToText
          }
          colorScheme="blue"
          color="white"
        >
          {isRecording
            ? "Stop recording"
            : "Start Recording"}
        </Button>
      </Flex>

      <Textarea
        bg="white"
        type="text"
        ref={queryInputRef}
        value={interimResult}
        size="md"
        placeholder="E.g.  How are you?"
      />

      <Box
        textAlign={["center", "center", "right"]}
        my={["5", "5", "3"]}
      >
        {isLoading ? (
          <SubmitButton
            px="5"
            isLoading={true}
            loadingText="Searching.."
          />
        ) : (
          <SubmitButton
            px="10"
            isLoading={false}
            text="Searching"
            handleSubmit={handleSubmit}
          />
        )}
      </Box>
    </>
  );
}
