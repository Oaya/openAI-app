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

  useEffect(() => {

  }, [])
  const getApiResponse = (query) => {
    let prompt = query
    openai.createCompletion('text-davinci-001', {
      prompt: prompt,
      temperature: 0,
      max_tokens: 6,
    }).then(res => {
      const response = res.data.choices[0].text;
      const obj = { prompt: query, response: response }
      setResponses((prev) => {
        return [...prev, obj]
      })
      console.log(responses)
    })

  }

  const providerData = {
    responses,
    getApiResponse
  }
  return <ApiContext.Provider value={providerData}>{props.children}</ApiContext.Provider>
}