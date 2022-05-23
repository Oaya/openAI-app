import React from "react";
import MenuButton from "../Buttons/MenuButton";
import { Flex, Box } from "@chakra-ui/react";
import SubHeading from "../SubHeading";

export default function Landing() {
  return (
    <Box mt={"100"}>
      <SubHeading
        text="How Would You Like to Learn?"
        fontSize={["2xl", "2xl", "4xl"]}
        textAlign={"center"}
      />

      <Flex
        direction={"row"}
        align={"center"}
        justify={"center"}
      >
        <MenuButton
          text="Quiz Mode"
          href="/quiz"
          width={["100%", "100%", "20%"]}
          fontSize={"30"}
        />
        <MenuButton
          text="Translate Mode"
          href="/translate"
          width={["100%", "100%", "20%"]}
          fontSize={"30"}
        />
      </Flex>
    </Box>
  );
}
