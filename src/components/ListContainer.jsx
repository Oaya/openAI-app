import React, { useContext } from 'react'
import { ApiContext } from '../Provider/ApiContext'

export default function ListContainer() {

  const { responses } = useContext(ApiContext);

  console.log(responses)
  return (
    <div></div>
  )
}
