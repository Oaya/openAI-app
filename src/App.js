import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import ListContainer from "./components/ListContainer";

function App() {


  return (
    <Box w='70%' m='auto'>
      <Header />
      <Form />
      <ListContainer />
    </Box>
  );
}

export default App;
