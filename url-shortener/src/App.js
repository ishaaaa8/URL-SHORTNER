
import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShorener from './InputShorener';
import LinkResult from './LinkResult';
import { useState } from 'react';
function App() {
  const [inputValue,setInputValue]=useState("");
  return (
    <div className="container">
      <InputShorener setInputValue={setInputValue}/>
      <BackgroundAnimate/>
      <LinkResult inputValue={inputValue}/>
    </div>
  );
}

export default App;
