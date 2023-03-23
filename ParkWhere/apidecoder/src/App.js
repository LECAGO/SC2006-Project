

//import logo from './logo.svg';
import './App.css';
//import uradet from "./public/uradetails.json";


//states, to be used with 'hooks':
// useState : for making states
// useEffect : for effecting them outside of their functions?
import { useState, useEffect } from 'react';



// global api retrieved data that will be combined for access
var glistURAAPI = [];
var glistHDBSTATIC = [];
var glisturagov = [];
var glistlta = [];
var gcombinedArrayData = [];

// ensure after 1 successful run doesn't run twice
var guracheck = 0;
var ghdbcheck = 0;
var guragovcheck = 0; 
var gltacheck = 0;
var gcadcheck = 0;

// resolving cors


// where components go, IMPORTANT: components must start with a capital letter
// 'Comp1' is ok! 'comp1' is not!.

// component

// timeout component to wait for loading data
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

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
        <h1>Connection to API at {props.hostname} is ok!</h1>
        </>
 ) : (
        <>
        <h1>API at {props.hostname} is unavailable. </h1>
        </>
 )

    } </>
  );

}

const Apiretrieveandmergecarparkavail = (props) => {
  
  
  const [apiretrieveinfo, setapiretrieveinfo] = useState([]);
  useEffect(()=>{
    const checkconnection = async () => {
      try{
        
        if(props.arguements == '' && guracheck == 0){
        const response = await fetch(props.hostname);
        const jsonrep = await response.json();
        //console.log(jsonrep);
        //console.log(response.status);
        if(response.status == 200){
          setapiretrieveinfo(jsonrep);
        } else {
          setapiretrieveinfo('');
        }
        var listURAAPI = [];
        var formatrepapi = JSON.parse(JSON.stringify(jsonrep));
        var konkurs = formatrepapi["items"]?.[0]?.["carpark_data"];
        console.log(konkurs?.["length"]);
        //console.log(konkurs?.[0]); // fixes undefined bug
        //console.log(konkurs?.[0]?.["carpark_number"]);
        //console.log(konkurs?.[0]?.["carpark_info"]?.[0]?.["total_lots"]);
        //console.log(konkurs);
        
        //testar.push(konkurs?.[0]?.["carpark_number"]);
        //testar.push(konkurs?.[0]?.["carpark_info"]?.[0]?.["total_lots"]);
        //testar.push(konkurs?.[0]?.["carpark_info"]?.[0]?.["lot_type"]);
        //testar.push(konkurs?.[0]?.["carpark_info"]?.[0]?.["lots_available"]);
        
        for(let ictr = 0; ictr < konkurs?.["length"];ictr++ ){
        listURAAPI.push(konkurs?.[ictr]?.["carpark_number"]);
        //listURAAPI.push(' ');
        listURAAPI.push(konkurs?.[ictr]?.["carpark_info"]?.[0]?.["total_lots"]);
        //listURAAPI.push(' ');
        listURAAPI.push(konkurs?.[ictr]?.["carpark_info"]?.[0]?.["lots_available"]);
        //listURAAPI.push(' ');
        listURAAPI.push(konkurs?.[ictr]?.["carpark_info"]?.[0]?.["lot_type"]);
        //listURAAPI.push(<div> </div>);
        }
        
        glistURAAPI = listURAAPI;
        guracheck++;
      } else {

      }
        
      } catch (error) 
      {
          
      }

      
    }

    checkconnection();
   

  },[]);
  
  //console.log(listURAAPI.length);
  return (
    <>
   

{
      apiretrieveinfo != ''?(
        <>
        <h1>
          <p></p>
          <ul>
          {/*apiretrieveinfo.map((item, i)=>(
          <tr key={i}>
            <td>{item.carpark_number}</td>
            <td>{item.update_datetime}</td>
          </tr>

        ))*/
        /*<pre>{JSON.stringify(apiretrieveinfo, null, 1)}</pre>*/
        //glistURAAPI
        }</ul>

        

        </h1>
        </>
 ) : (
        <>
        <h1>API at {props.hostname} is unretrievable. </h1>
        </>
 )

    } </>
  );
  


}


const Apiretrieveandmergehdbstatic = (props) => {
  
  
  const [apiretrieveinfo, setapiretrieveinfo] = useState('');
  useEffect(()=>{
    const checkconnection = async () => {
      try{
        
        if(props.arguements == '' && ghdbcheck == 0){
        const response = await fetch(props.hostname);
        const jsonrep = await response.json();
        //console.log(jsonrep);
        //console.log(response.status);
        if(response.status == 200){
          setapiretrieveinfo(jsonrep);
        } else {
          setapiretrieveinfo('');
        }

        var listHDBSTATIC = [];
    var formatrepapi = JSON.parse(JSON.stringify(jsonrep));
    //console.log(formatrepapi);
    //var kons = formatrepapi["result"]?.["records"]?.[0];
    //console.log(kons?.["address"]);
    //console.log(formatrepapi["result"]?.["records"]?.["length"]);
     //var arc = [];
     console.log(formatrepapi["result"]?.["records"]?.["length"]);
     for(let ic = 0; ic < formatrepapi["result"]?.["records"]?.["length"]; ic++){
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["car_park_no"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["address"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["x_coord"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["y_coord"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["car_park_type"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["type_of_parking_system"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["short_term_parking"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["free_parking"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["night_parking"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["car_park_basement"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["car_park_decks"]);
        //listHDBSTATIC.push(' ');
        listHDBSTATIC.push(formatrepapi["result"]?.["records"]?.[ic]?.["gantry_height"]);
        //listHDBSTATIC.push(<div> </div>);
     }

     glistHDBSTATIC = listHDBSTATIC;
     ghdbcheck++;
      } else {

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
      apiretrieveinfo != ''?(
        <>
        <h1>
          <p></p>
          <ul>
          {/*apiretrieveinfo.map((item, i)=>(
          <tr key={i}>
            <td>{item.carpark_number}</td>
            <td>{item.update_datetime}</td>
          </tr>

        ))*/
        /*<pre>{JSON.stringify(apiretrieveinfo, null, 1)}</pre>*/
        //glistHDBSTATIC
        }</ul>

        

        </h1>
        </>
 ) : (
        <>
        <h1>API at {props.hostname} is unretrievable. </h1>
        </>
 )

    } </>
  );
  


}

// needs accesskey 
// unusable due to cors problem?

// try with powershell:
// https://www.npmjs.com/package/node-powershell
// https://stackoverflow.com/questions/10179114/execute-powershell-script-from-node-js
// https://stackoverflow.com/questions/66000276/how-do-i-get-return-values-from-invoke-webrequest

// run PS script in the background constantly updating?

//  Invoke-WebRequest -Method 'Get' -Uri "https://www.ura.gov.sg/uraDataService/insertNewToken.action" -Body ($body|ConvertTo-Json) -Headers @{'AccessKey' = '54053354-175e-49b0-a110-977699e79360'}


const Apiretrieveandmergeuragov = (props) => { 
  
  
  const [apiretrieveinfo, setapiretrieveinfo] = useState('');
  useEffect(()=>{
    const checkconnection = async () => {
      try{
        
        if(props.arguements == '' && guragovcheck == 0){
         
          
        
        const response = await fetch('./uraavail.json');
        const responsed = await fetch('./uradetails.json');
        //console.log(response.status);
        //console.log(response.json());
         
        const jsonrep = await response.json();
        const jsonrepd = await responsed.json();
        //console.log(jsonrep);
        //console.log("HELP");
        if(response.status == 200 && responsed.status == 200){
          setapiretrieveinfo(jsonrep);
        } else {
          setapiretrieveinfo('');
        }
          var locallist = [];
          var formatrepapi = JSON.parse(JSON.stringify(jsonrep));
          var formatrepapidetail = JSON.parse(JSON.stringify(jsonrepd));
          var konkurs = formatrepapi["Result"];
          var konkursdetail = formatrepapidetail["Result"];
          //console.log(konkurs2);
        
        
        var commasep = [];
        
        var freeparkchk = 0;
        var nightparkchk = 0;

        var matchcount = 0;

        for(let ictr = 0; ictr < konkurs?.["length"];ictr++ ){
        commasep = [];
        matchcount = 0;
        freeparkchk = 0;
        nightparkchk = 0;
        // add to list
        

          for(let vvtr = 0; vvtr < konkursdetail.length ;vvtr++){

            if(konkurs?.[ictr]?.["carparkNo"] == konkursdetail?.[vvtr]?.["ppCode"] && 
            konkursdetail?.[vvtr]?.["vehCat"] == "Car"
            )
            {
              
              if(matchcount >= 1){
                // sunPHRate for freeparking
              if(konkursdetail?.[vvtr]?.["sunPHRate"] == "$0.00"){
                freeparkchk = 1;
              }
              // night parking check
              if(konkursdetail?.[vvtr]?.["startTime"] == "10.30 PM"){
                nightparkchk = 1;
                
              }

              } else{
              locallist.push(konkurs?.[ictr]?.["carparkNo"]);

              locallist.push(konkursdetail?.[vvtr]?.["ppName"]); // address
              
              commasep = String(konkurs?.[ictr]?.["geometries"]?.[0]?.["coordinates"]).split(",");
              locallist.push(commasep[0]); // x coord
              locallist.push(commasep[1]); // y coord
              
              locallist.push(konkurs?.[ictr]?.["lotsAvailable"]);
              locallist.push(konkursdetail?.[vvtr]?.["parkCapacity"]); // total lots
              locallist.push(konkurs?.[ictr]?.["lotType"]);
              locallist.push("URA"); // Agency
              if(konkursdetail?.[vvtr]?.["parkingSystem"] == "C"){
                locallist.push("Coupon Parking System"); // parking system
              } else if(konkursdetail?.[vvtr]?.["parkingSystem"] == "B"){
                locallist.push("Electronic Parking System"); // parking system
              } else {
                locallist.push("Parking n/a");
              }
              locallist.push("Short Term Parking Info n/a");
              // sunPHRate for freeparking
              if(konkursdetail?.[vvtr]?.["sunPHRate"] == "$0.00"){
                freeparkchk = 1;
              }
              // night parking check
              if(konkursdetail?.[vvtr]?.["startTime"] == "10.30 PM"){
                nightparkchk = 1;
                
              }
              matchcount++;
              
              }
            }

          }
          if( freeparkchk == 1){
            locallist.push("SUN & PH FR 7AM-10.30PM");
          } else {
            locallist.push("NO");
          }

          if( nightparkchk == 1){
            locallist.push("YES");
          } else {
            locallist.push("NO");
          }
          locallist.push("URAGOVAPI");
        }
        
        glisturagov = locallist;
        guragovcheck++;
      } else {

      }
        
      } catch (error) 
      {
        console.log("HELP: "+ error);
      }

      
    }

    checkconnection();
   

  },[]);
  
  //console.log(listURAAPI.length);
  return (
    <>
   

{
      apiretrieveinfo != ''?(
        <>
        <h1>
          <p></p>
          <ul>
          {//glisturagov
          }
          </ul>

        

        </h1>
        </>
 ) : (
        <>
        <h1>Token-Necessary API from Ura Gov Has a Format Error. </h1>
        </>
 )

    } </>
  );
  


}

const ApiretrieveandmergeLTA = (props) => { 
  
  
  const [apiretrieveinfo, setapiretrieveinfo] = useState('');
  useEffect(()=>{
    const checkconnection = async () => {
      try{
        
        if(props.arguements == '' && gltacheck == 0){
         
          
        
        const response = await fetch('./ltadatamall.json');
        //console.log(response.status);
        //console.log(response.json());
         
        const jsonrep = await response.json();
        //console.log(jsonrep);
        //console.log("HELP");
        if(response.status == 200){
          setapiretrieveinfo(jsonrep);
        } else {
          setapiretrieveinfo('');
        }
          var locallist = [];
          var formatrepapi = JSON.parse(JSON.stringify(jsonrep));
          var konkurs = formatrepapi["value"];
          //console.log(formatrepapi);
        
        var commasep = [];
        
        for(let ictr = 0; ictr < konkurs.length;ictr++ ){
          if(konkurs?.[ictr]?.["Agency"] == "LTA"){
        // add to list
        //locallist.push(konkurs?.[ictr]?.["carparkNo"]);
        //commasep = String(konkurs?.[ictr]?.["geometries"]?.[0]?.["coordinates"]).split(",");
        //locallist.push(commasep[0]); // x coord
        //locallist.push(commasep[1]); // y coord
        //locallist.push(konkurs?.[ictr]?.["lotType"]);
        //locallist.push(konkurs?.[ictr]?.["lotsAvailable"]);
        commasep = [];
        locallist.push(konkurs?.[ictr]?.["CarParkID"]); // carpark id
        locallist.push(konkurs?.[ictr]?.["Area"] + " " + konkurs?.[ictr]?.["Development"]); // address
        commasep = String(konkurs?.[ictr]?.["Location"]).split(" ");
        locallist.push(commasep[0]); // x coord
        locallist.push(commasep[1]); // y coord
        locallist.push(konkurs?.[ictr]?.["AvailableLots"]); // lots available
        locallist.push("NoInfoForTotalCarparkCapacityForLTA");
        locallist.push(konkurs?.[ictr]?.["LotType"]); // carpark lot type
        locallist.push(konkurs?.[ictr]?.["Agency"]); // carpark Agency
        locallist.push("NoInfoForParkingSystemForLTA");
        locallist.push("NoInfoForShortTermParkingForLTA");
        locallist.push("NoInfoForFreeParkingForLTA");
        locallist.push("NoInfoForNightParkingForLTA");
        locallist.push("LTAAPI");
          }
        }
        
        glistlta = locallist;
        gltacheck++;
      } else {

      }
        
      } catch (error) 
      {
        console.log("HELP: "+ error);
      }

      
    }

    checkconnection();
   

  },[]);
  
  //console.log(listURAAPI.length);
  return (
    <>
   

{
      apiretrieveinfo != ''?(
        <>
        <h1>
          <p></p>
          <ul>
          {//glisturagov
          }
          </ul>

        

        </h1>
        </>
 ) : (
        <>
        <h1>Token-Necessary API at LTA Has a Format Error. </h1>
        </>
 )

    } </>
  );
  


}



const Datacombine = (props) => {
  
  
  const [combineData, addcombineData] = useState(0);
  useEffect(()=>{
   
    const syncwcalls = async () => {
    try{
      await timeout(1000 * 60); // wait 60 seconds
      if(glistURAAPI.length != 0 && glistHDBSTATIC.length != 0){
      const response = await fetch(props.hostname1);
      const jsonrep = await response.json();
      const response2 = await fetch(props.hostname2);
      const jsonrep2 = await response2.json();

      var combinedArrayData = [];
      var exctr = 0;
      console.log(glistURAAPI.length);
      console.log(glistURAAPI[2]);
      //var temporar = [];
      for(let ctcr = 0; ctcr < glistURAAPI.length; ctcr+=4){
        //combinedArrayData.push([]);
        //combinedArrayData[exctr][0] = glistURAAPI[ctcr]; //change 1
        // combinedArrayData[exctr].push(glistURAAPI[ctcr+1]);
        // combinedArrayData[exctr].push(glistURAAPI[ctcr+2]);
        // combinedArrayData[exctr].push(glistURAAPI[ctcr+3]);
        for(let inctr1 = 0; inctr1 < glistHDBSTATIC.length ;inctr1+=12){
          if(glistURAAPI[ctcr] == glistHDBSTATIC[inctr1]){ // carpark no. change1
            combinedArrayData.push([]); // change again
            combinedArrayData[exctr][0] = glistURAAPI[ctcr]; //  change 1
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+1]); // address
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+2]); // x_cord
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+3]); // y_cord
            combinedArrayData[exctr].push(glistURAAPI[ctcr+2]); // available lots
            combinedArrayData[exctr].push(glistURAAPI[ctcr+1]); // total lots
            combinedArrayData[exctr].push(glistURAAPI[ctcr+3]); // lot type
            combinedArrayData[exctr].push("HDB"); // agency
            // combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+4]); // car park type
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+5]); // type Parking System
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+6]); // short term parking
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+7]); // free parking
            combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+8]); // night parking
            combinedArrayData[exctr].push("HDBGOVAPI"); 
            //combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+4]); // car park type
            //combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+9]);  // car park basement
            //combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+10]); // car park deck
            //combinedArrayData[exctr].push(glistHDBSTATIC[inctr1+11]); // gantry height
            exctr++;
            break;// exit loop since found, added 22/3/2023
          }
        }
        //exctr++;
        //glistURAAPI[ctcr];
        //temporar.push(glistURAAPI[ctcr+1]);
        //temporar.push(glistURAAPI[ctcr+2]);
        //temporar.push(glistURAAPI[ctcr+3]);
        //combinedArrayData.push(temporar);
        //temporar.length = 0;
        //console.log("good!");
      }

      for(let vtvr = 0; vtvr < glisturagov.length; vtvr+=13){
        combinedArrayData.push([]);
        combinedArrayData[exctr][0] = glisturagov[vtvr];
        combinedArrayData[exctr].push(glisturagov[vtvr+1]);
        combinedArrayData[exctr].push(glisturagov[vtvr+2]);
        combinedArrayData[exctr].push(glisturagov[vtvr+3]);
        combinedArrayData[exctr].push(glisturagov[vtvr+4]);
        combinedArrayData[exctr].push(glisturagov[vtvr+5]);
        combinedArrayData[exctr].push(glisturagov[vtvr+6]);
        combinedArrayData[exctr].push(glisturagov[vtvr+7]);
        combinedArrayData[exctr].push(glisturagov[vtvr+8]);
        combinedArrayData[exctr].push(glisturagov[vtvr+9]);
        combinedArrayData[exctr].push(glisturagov[vtvr+10]);
        combinedArrayData[exctr].push(glisturagov[vtvr+11]);
        combinedArrayData[exctr].push(glisturagov[vtvr+12]);
        exctr++;
      }

      for(let vtvr = 0; vtvr < glistlta.length; vtvr+=13){
        combinedArrayData.push([]);
        combinedArrayData[exctr][0] = glistlta[vtvr];
        combinedArrayData[exctr].push(glistlta[vtvr+1]);
        combinedArrayData[exctr].push(glistlta[vtvr+2]);
        combinedArrayData[exctr].push(glistlta[vtvr+3]);
        combinedArrayData[exctr].push(glistlta[vtvr+4]);
        combinedArrayData[exctr].push(glistlta[vtvr+5]);
        combinedArrayData[exctr].push(glistlta[vtvr+6]);
        combinedArrayData[exctr].push(glistlta[vtvr+7]);
        combinedArrayData[exctr].push(glistlta[vtvr+8]);
        combinedArrayData[exctr].push(glistlta[vtvr+9]);
        combinedArrayData[exctr].push(glistlta[vtvr+10]);
        combinedArrayData[exctr].push(glistlta[vtvr+11]);
        combinedArrayData[exctr].push(glistlta[vtvr+12]);
        exctr++;
      }
      /*  [0][0] = [0] carpark no.
          [0][1] = [1] total lots
          [0][2] = [2] lots avail
          [0][3] = [3] lot type
          [1][0] = [0] carpark no.
      */
          //console.log(combinedArrayData[0]);
    gcombinedArrayData = combinedArrayData;
    addcombineData(1);
      }
   }catch(error){
    
    console.log("error!");
   }

  
  }

  syncwcalls();
  },[]);
  
  // display output data
  return (
    <>
   

{
      combineData == 1?(
        <>
        
        {
          
       <div>
       {gcombinedArrayData.map((items, index) => {
         return (
           <ol>
             {items.map((subItems, sIndex) => {
              if(subItems != ''){
               return <li> {
                subItems} </li>;
               }
               
              })}
           </ol>
         );
       })}
     </div>
        } 
        
        </>
 ) : (
        <>
        <h1>Data merging has failed! </h1>
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
      <Apicheck hostname={'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c'}/>
      {/*
      <Apicheck hostname={'https://www.ura.gov.sg/uraDataService/'} />
      
      <Apicheck hostname={'http://datamall2.mytransport.sg/'}/>
      <Apicheck hostname={'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c'}/>
  */}
      {/*
      still needs:
      https://www.ura.gov.sg/maps/api/#car-park
      https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html
      https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&q=clementi
      */}
    <Apiretrieveandmergecarparkavail hostname={'https://api.data.gov.sg/v1/transport/carpark-availability'} arguements={''}/>
    
    
    <Apiretrieveandmergehdbstatic hostname={'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2193'} arguements={''}/>
    
    <Apiretrieveandmergeuragov arguements={''}/>
      
    <ApiretrieveandmergeLTA arguements={''}/>
    
    
    
    <Datacombine hostname1={'https://api.data.gov.sg/v1/transport/carpark-availability'} hostname2={'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2193'}/>
  
    {/*<Apiretrieveandmergeuragov arguements={''}/>*/}
    </div>
  );
}

export default App;
