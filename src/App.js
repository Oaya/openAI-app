import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Translate from "./components/Pages/Translate";
import Landing from "./components/Pages/Landing";
import Quiz from "./components/Pages/Quiz";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Box bg={'#EDFDFD'} >
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} exact />
            <Route path="/quiz" element={<Quiz />} exact />
            <Route path="/translate" element={<Translate />} exact />
          </Routes>
        </Box>
      </BrowserRouter>
    </>)
}

export default App;
