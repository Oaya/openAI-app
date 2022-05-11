import React, { useState, useContext } from 'react';
import { ApiContext } from '../Provider/ApiContext';


export default function Form() {
  const [query, setQuery] = useState('');
  const { getApiResponse } = useContext(ApiContext)


  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //search function from context//
    getApiResponse(query)
  }

  return (
    <form>
      <input type='text' value={query} onChange={handleChange}></input>
      <button onClick={handleSubmit}>Search</button>
    </form>
  )
}
