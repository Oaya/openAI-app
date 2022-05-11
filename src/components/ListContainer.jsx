import React, { useContext } from 'react'
import { ApiContext } from '../Provider/ApiContext'

export default function ListContainer() {

  const { responses } = useContext(ApiContext);


  return (
    <div>
      {responses.map(response => (
        <ul key={response.prompt}>
          <li>{response.prompt}</li>
          <li>{response.response}</li>
        </ul>
      ))}
    </div>
  )
}
