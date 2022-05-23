import React, { createContext, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { questionList } from '../languageData';

//set congiguration for openAI//
const config = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY
});
const openai = new OpenAIApi(config);


const shuffleList = (list) => list.sort(() => Math.random() - 0.5);


const shuffleQuestionsList = shuffleList([...questionList]);
console.log(shuffleQuestionsList, questionList) //okay


export const ApiContext = createContext();

export default function ApiProvider(props) {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);

  const [answerChoice, setAnswerChoice] = useState([]);
  const [question, setQuestion] = useState(shuffleQuestionsList[0]);
  const [answer, setAnswer] = useState('');

  const getTranslate = (query, languages) => {
    const langList = languages?.map(({ value }) => value);
    const indexArray = languages?.map(({ index }) => index)
    const langString = langList.join(' and ');

    let prompt = `Translate this into ${langString}: \n${query}\n`;

    if (query && languages) {
      openai.createCompletion('text-davinci-002', {
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
        .then(res => {
          const response = res.data.choices[0].text.split('\n');
          //remove empty string from response list//
          const responseArray = response.filter(Boolean)
          const obj = { prompt: query, response: responseArray, languages: langList, index: indexArray }
          setResponses((prev) => {
            return [...prev, obj]
          });
          setIsLoading(false)
        })
        .catch(err => {
          setIsLoading(false)
          throw Error("Something went wrong. Please try again.", err);
        })
    } else {
      setIsLoading(false)
      throw Error("Couldn't find query and languages. Please try again.");
    }

  };

  const getQuestion = (language) => {
    let prompt = `How to say ${questionList} in \n ${language.value}`;

    if (questionList && language) {
      openai.createCompletion('text-davinci-002', {
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 300,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
        .then(res => {
          const response = res.data.choices[0].text.split('\n');
          //remove empty string from response list//
          const responseArray = response.filter(Boolean)

          console.log(responseArray);//okay
          setQuestionArray(responseArray);
          //get answer//
          const answerIndex = questionList.findIndex((item) => (item === question));
          console.log(responseArray[answerIndex])//okay
          //remove answer from list and shuffle it//
          const answersList = [...responseArray]
          answersList.splice(answerIndex, 1);
          console.log(answersList);//oaky 
          const shuffleAnswersList = shuffleList(answersList);
          console.log(shuffleAnswersList[1], shuffleAnswersList[2], responseArray[answerIndex])

          setAnswerChoice([responseArray[answerIndex], shuffleAnswersList[1], shuffleAnswersList[2]]);
          setAnswer(responseArray[answerIndex])

          setIsLoading(false)
        })
        .catch(err => {
          setIsLoading(false)
          throw Error("Something went wrong. Please try again.", err);
        })
    } else {
      setIsLoading(false)
      throw Error("Couldn't find language. Please try again.");
    }
  }
  const shuffleAnswers = shuffleList([...answerChoice]);

  const providerData = {
    responses,
    isLoading,
    questionArray,
    getTranslate,
    getQuestion,
    setIsLoading,
    answerChoice,
    question,
    setQuestion,
    answer,
    shuffleAnswers
  }
  return <ApiContext.Provider value={providerData}>{props.children}</ApiContext.Provider>
}