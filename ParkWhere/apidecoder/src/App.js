

//import logo from './logo.svg';
import './App.css';



//states, to be used with 'hooks':
// useState : for making states
// useEffect : for effecting them outside of their functions?
import { useState, useEffect } from 'react';

// where components go, IMPORTANT: components must start with a capital letter
// 'Comp1' is ok! 'comp1' is not!.

// component

//Component to check if there is a connection to the internet
const Networkcheck = () => {
  
  const [connectionstatus, setcon] = useState(0);

  // check connection to internet
  // 'async' is needed for the 'await' option to be used for checking website status
  useEffect(  ()=>{

    const checkconnection = async () => {
      try{
        

        const response = await fetch('https://www.google.com', { // Check for internet connectivity
        mode: 'no-cors',
        });
        
        //console.log(response.status);
        if(response.status == 0){
          setcon(1);
        } else {
          setcon(-1);
        }
        
      } catch (error) 
      {
          
      }
    }

    checkconnection();
    

  },[]);

 

  return (
    <>
    {
      connectionstatus > 0?(
        <>
        <h1>Connection to internet is ok!</h1>
        </>
 ) : (
        <>
        <h1>You are not connected to the internet </h1>
        </>
 )

    }

</>
  );

}

// check connection to api
const Apicheck = (props) => {
  
  
  const [apistatus, setapi] = useState(0);

  

  // check connection to api
  useEffect(()=>{
    const checkconnection = async () => {
      try{
        

        const response = await fetch(props.hostname, { // Check for internet connectivity
        mode: 'no-cors',
        });
        
        //console.log(response.status);
        if(response.status == 0){
          setapi(1);
        } else {
          setapi(-1);
        }
        
      } catch (error) 
      {
          
      }
    }

    checkconnection();
    
  },[]);

  return (
    <>
   

{
      apistatus > 0?(
        <>
        <h1>Connection to API is ok!</h1>
        </>
 ) : (
        <>
        <h1>API is unavailable. </h1>
        </>
 )

    } </>
  );

}



const App = () => {
  // where js code goes for the main App component

  

// {} allows for jscode to be rendered in web
// each must be seperated by <> </>
  return (
    <div className="App">
      <h1> API-Decoder Version {1 + 0} </h1>
      
      <Networkcheck />

      <Apicheck hostname={'https://api.data.gov.sg/v1/transport/carpark-availability'}/>
      
    </div>
  );
}

export default App;
