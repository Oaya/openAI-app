import React, { createContext, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { questionList } from '../languageData';

//set congiguration for openAI//
const config = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY
});
const openai = new OpenAIApi(config);

export const ApiContext = createContext();

export default function ApiProvider(props) {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);


  const getApiResponse = (query, languages) => {
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
    let prompt = `How to say \n${questionList}\n in ${language.value}`;

    if (questionList && language) {
      openai.createCompletion('text-davinci-002', {
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
        .then(res => {
          const response = res.data.choices[0].text.split('\n')
          //remove empty string from response list//
          const responseArray = response.filter(Boolean)
          console.log(responseArray)
          setQuestionArray(responseArray)
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

  const providerData = {
    responses,
    isLoading,
    questionArray,
    getApiResponse,
    getQuestion,
    setIsLoading,

  }
  return <ApiContext.Provider value={providerData}>{props.children}</ApiContext.Provider>
}