import React, { useState } from 'react'

export default function InputShorener({setInputValue}) {
  const [value,setValue]=useState("");
  const handleClick = () => {
    console.log("Button clicked"); 
    setInputValue(value);
    console.log(value);
    setValue("");
  }
  return (
    <div className='inputContainer'>
        <h1>URL<span>shortener</span></h1>
        <div>
            <input 
              type='text' 
              placeholder='Paste a link to shorten it'
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              >

              </input>
            <button onClick={handleClick}>Shorten</button>
        </div>
    </div>
  )
}
