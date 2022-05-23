import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Text,
  Stack,
  Radio,
  RadioGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import uuid from "react-uuid";

import { ApiContext } from "../Provider/ApiContext";
import EmptyContainer from "./EmptyContainer";
import Error from "./Error";
import { FormContext } from "../Provider/FormContext";
import SubHeading from "./SubHeading";

export default function QuizContainer() {
  const [pickedAnswer, setPickedAnswer] =
    useState("");
  const [score, setScore] = useState(0);
  const [popUp, setPopUp] = useState();
  const { inputError, setInputError } =
    useContext(FormContext);

  const {
    questionArray,
    question,
    answer,
    finish,
    setFinish,
    shuffleAnswers,
    setQuestionIdx,
    questionIdx,
    isLoading,
    createQuestionAndAnswerFromList,
  } = useContext(ApiContext);

  useEffect(() => {
    if (questionIdx === 5) {
      setTimeout(() => {
        setFinish(true);
      }, 3000);
    }
    setTimeout(() => {
      createQuestionAndAnswerFromList(
        questionArray
      );
    }, 2000);
  }, [questionIdx]);

  const handleAnswer = (e) => {
    e.preventDefault();

    if (!pickedAnswer) {
      setInputError(
        "You need pick answer from the list "
      );
    } else {
      if (pickedAnswer === answer) {
        setScore((prev) => prev + 1);
        setPopUp({
          text: "You are Correct!! Good Job!",
          status: "success",
        });
      } else {
        setPopUp({
          text: `Correct answer is ${answer} `,
          status: "error",
        });
      }

      //get next question//
      setPickedAnswer("");
      setQuestionIdx((prev) => prev + 1);
    }

    setTimeout(() => {
      setPopUp();
      setInputError("");
    }, 2000);
  };

  return (
    <Box>
      {questionArray.length === 0 || isLoading ? (
        <EmptyContainer text="Your Quiz will show in here!" />
      ) : finish ? (
        <EmptyContainer
          text={`Your Score is ${score}/ 5`}
        />
      ) : (
        <>
          <SubHeading
            text="Pick the best one from the choice"
            fontSize={["lg", "xl", "2xl"]}
            textAlign={"center"}
          />
          {popUp && (
            <Error
              status={popUp.status}
              text={popUp.text}
            />
          )}
          {inputError && (
            <Error
              text={inputError}
              status="error"
            />
          )}

          <Box
            bg={"#C4F1F9"}
            rounded="md"
            mt={["1", "3", "5"]}
            mb={"10"}
            p={["2.5", "5"]}
            fontSize={"lg"}
            fontWeight={"bold"}
          >
            <Flex
              direction={[
                "column",
                "column",
                "row",
              ]}
              justifyContent={"space-between"}
              mb="5"
            >
              <Text
                as="span"
                fontSize={["md", "lg", "xl"]}
              >
                How to say
                <Text
                  as="span"
                  color={"#805AD5"}
                  fontWeight={"bold"}
                  fontSize={["md", "lg", "2xl"]}
                >
                  {" "}
                  {question}
                </Text>
              </Text>
              <Text
                fontSize={["sm", "md", "lg"]}
                textAlign={"right"}
              >
                Score: {score}/ 5
              </Text>
            </Flex>

            <Flex
              direction={"row"}
              justifyContent={"space-between"}
            >
              <RadioGroup
                onChange={setPickedAnswer}
                value={pickedAnswer}
                _checked={{ color: "green" }}
                fontSize="sm"
              >
                <Stack direction="column">
                  {shuffleAnswers.map(
                    (answer) => (
                      <Radio
                        key={uuid()}
                        value={answer}
                        size={"lg"}
                        colorScheme="cyan"
                        bg="white"
                      >
                        {answer}
                      </Radio>
                    )
                  )}
                </Stack>
              </RadioGroup>

              <Button
                width={["10%", "20%"]}
                alignSelf={"flex-end"}
                px={["10", "20", "30"]}
                onClick={handleAnswer}
                colorScheme="blue"
                color="white"
              >
                Check
              </Button>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
}
