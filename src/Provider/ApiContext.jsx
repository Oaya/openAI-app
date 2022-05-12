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
    let prompt = `Translate this into 1. French, 2. Spanish and 3. Japanese: \n\n${query}\n\n1.`
    openai.createCompletion('text-davinci-001', {
      prompt: prompt,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
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