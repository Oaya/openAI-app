import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import Header from "./components/Header";

const config = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY
});


const openai = new OpenAIApi(config);


function App() {
  openai.createCompletion('text-davinci-001', {
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 6,
  }).then(res => {
    console.log(res.data.choices[0].text)
  })


  return (
    <Header />
  );
}

export default App;
