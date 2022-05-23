import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

import { ApiContext } from "../Provider/ApiContext";
import EmptyContainer from "./EmptyContainer";
import SubHeading from "./SubHeading";
import TranslateListItem from "./TranslateListItem";

export default function TranslateList() {
  const { responses } = useContext(ApiContext);
  const reversedRes = [...responses].reverse();

  return (
    <Box
      w={["82%", "82%", "75%"]}
      m="auto"
      mb={["10"]}
    >
      <SubHeading
        text="Your Translation List"
        fontSize={["2xl", "2xl", "4xl"]}
        textAlign={"center"}
      />
      {reversedRes.length === 0 ? (
        <EmptyContainer text="AI will find translations for you here!" />
      ) : (
        reversedRes.map((res, i) => (
          <TranslateListItem
            key={i}
            prompt={res.prompt}
            response={res.response}
            languages={res.languages}
            index={res.index}
          />
        ))
      )}
    </Box>
  );
}
