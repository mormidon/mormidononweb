import './App.css'
import { Button, ProgressBar } from 'react-bootstrap'
import { useState } from 'react';


function App() {

  const [progr, setProgr] = useState(0);

  const handleClick = (event) => {
    setProgr(progr + 1);
    event.target.disabled = true;
  }
  
  return (
    <>
      <div>
      <h1>Black Forest 2</h1>
      <Button onClick={handleClick} variant="danger" size="lg" >Duo</Button>{' '}
      <Button onClick={handleClick} variant="warning" size="lg" >Java</Button>{' '}
      <Button onClick={handleClick} variant="secondary" size="lg" >Flight</Button>{' '}
      <Button onClick={handleClick} variant="primary" size="lg" >Burp</Button>{' '}
      <Button onClick={handleClick} variant="info" size="lg" >Prog</Button>{' '}
      <Button onClick={handleClick} variant="success" size="lg" >edX</Button>{' '}
    
      </div>
      <br></br>
      <div><ProgressBar now={progr} max={6} min={0} /></div>
    
    </>
  )
}

export default App
