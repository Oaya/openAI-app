import React, { createContext, useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

export const ApiContext = createContext();


//set congiguration for openAI//
const config = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY
});
const openai = new OpenAIApi(config);


export default function ApiProvider(props) {
  const [responses, setResponses] = useState([])

  const getApiResponse = (query, languages) => {
    const langString = languages?.map(({ value }) => value).join(' and ');
    console.log(langString)

    let prompt = `Translate this into ${langString}: \n${query}\n`;
    console.log(prompt);

    // if (query && languages) {
    //   openai.createCompletion('text-davinci-002', {
    //     prompt: prompt,
    //     temperature: 0.3,
    //     max_tokens: 100,
    //     top_p: 1.0,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 0.0,
    //   }).then(res => {
    //     const response = res.data.choices[0].text;

    //     const obj = { prompt: query, response: response }
    //     setResponses((prev) => {

    //       return [...prev, obj]
    //     })

    //   }).catch(err => {
    //     throw Error("Something went wrong. Please try again.", err)
    //   })
    // } else {
    //   throw Error("Couldn't find query and languages. Please try again.")
    // }
  };

  const providerData = {
    responses,
    getApiResponse
  }
  return <ApiContext.Provider value={providerData}>{props.children}</ApiContext.Provider>
}