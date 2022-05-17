import React, { useContext } from 'react';
import { ApiContext } from '../Provider/ApiContext';

export default function ListContainer() {

  const { responses } = useContext(ApiContext);

  return (
    <div>

      {responses.reverse().map((response, i) => (
        <ul key={i}>
          <li>{response.prompt}</li>
          <li>{response.response}</li>
        </ul>
      ))}
    </div>
  )
}
