import React from "react";
import { Box } from "@chakra-ui/react";

import Form from "../Form";
import TranslateList from "../TranslateList";
import MenuButton from "../Buttons/MenuButton";

export default function Translate() {
  return (
    <>
      <Box
        textAlign={["center", "center", "right"]}
      >
        <MenuButton
          text="Quiz Mode"
          href="/quiz"
          p={"2"}
          fontSize={"15"}
          width={["80%", "80%", "15%"]}
          weight="bold"
        />
      </Box>
      <Form />
      <TranslateList />
    </>
  );
}
