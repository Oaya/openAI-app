import {
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import Tcell from "./Tcell";
import TranslateButton from "./Buttons/TranslateButton";

export default function TranslateListItem({
  prompt,
  response,
  languages,
  index,
}) {
  const { voices } = useSpeechSynthesis();

  return (
    <Box>
      <TableContainer
        bg={"#C4F1F9"}
        my={["1", "3"]}
        rounded="md"
        p={"3"}
      >
        <Table
          colorScheme="teal"
          variant={"unstyled"}
        >
          <Tbody>
            <Tr>
              <Tcell
                weight="bold"
                text="Sentence :"
              />
              <Tcell text={prompt} />
            </Tr>
            <Tr>
              <Tcell
                weight="bold"
                text="Languages :"
              />
              {languages?.map((res, index) => (
                <Tcell key={index} text={res} />
              ))}
            </Tr>
            <Tr>
              <Tcell
                weight="bold"
                text="Translations :"
              />
              {response?.map((res, i) => (
                <Td
                  p={[1, 1, 2]}
                  fontSize={["12", "15", "18"]}
                  key={i}
                >
                  {res}
                  <TranslateButton
                    text={res}
                    voice={voices[index[i]]}
                  />
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
