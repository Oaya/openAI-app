import { Box } from "@chakra-ui/react";
import Form from "./components/Form";
import Header from "./components/Header";
import TranslateList from "./components/TranslateList";


function App() {


  return (
    <Box w='70%' m='auto'>
      <Header />
      <Form />
      <TranslateList />
    </Box>
  );
}

export default App;
