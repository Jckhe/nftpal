import { ModuleHandler } from './ModuleHandler';
import './Styles/App.css';
import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import feedBG from './assets/feedbg4.jpg'
import nightBG from './assets/nightmode.jpg'
import Favico from './assets/favicon.png'
import Favicon from "react-favicon";
import { AutoRefreshButton, ETHPrice, ManualRefreshButton, NightModeToggle } from './Menu';


export  function App() {

  const [nightMode, setNightMode] = useState(true);
  const [manuelRefresh, toggleRefresh] = useState();
  const [autoRefresh, toggleAutoRefresh] = useState(false);
  const [autoRefreshTimer, setRefreshTimer] = useState(0);

  //props for auto-refresh intervals
  const IntervalTimerFunc = (num) => {
    setRefreshTimer(num)
    console.log(num)
    console.log(autoRefreshTimer)
  }

  //night mode stuff
  const nightModeFunc = (e) => {
    setNightMode(!nightMode)
  }

  const nightModeHandler = () => {
    if (nightMode === false) {
      return {
        backgroundColor: "#cdd7b6"
      }
    } else {
      return {
        backgroundColor: "#383B32"
      }
    }
  }

  const nightModeBG = () => {
    if (nightMode === true) {
      return {
        backgroundImage: `url(${nightBG})`
      }
    } else {
      return {
        backgroundImage: `url(${feedBG})`
      }
    }
  }
  //ETH Price 

  const fetchETHPrice = () => {
    const options = {method: 'GET'};
    fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=NU8841D6JKV8NY9HXD3F9DEVRD9Z6VG5W4", options)
      .then(response => response.json())
      .then(response => {
        let eth = response.result.ethusd;
        console.log(eth)
      })
  }
  
  //manual refresh stuff
  const refreshClick = () => {
    toggleRefresh(true)

  }

  
  
  //props function
  const autoRefreshHandle = () => {
    toggleAutoRefresh(!autoRefresh)
    setRefreshTimer(300000)
  }

  


  useEffect(() => {
    document.title = 'NFTPal'
    if (autoRefresh === true) {
      setTimeout(() => {
          setRefreshTimer(autoRefreshTimer + 1);
          console.log("yo: " + autoRefreshTimer)
        }, autoRefreshTimer);
    } else {
      setRefreshTimer(0)
    }
    toggleRefresh();
  }, [autoRefresh, autoRefreshTimer])

  return (
    <div className="body" style={nightModeHandler()}>
      <div className="switch">
        <div className="nbuttonContainer">
          <NightModeToggle func={nightModeFunc} />
          <ManualRefreshButton refresh={refreshClick} />
          <AutoRefreshButton intervalFunc={IntervalTimerFunc} func={autoRefreshHandle} />
          <ETHPrice />
        </div>
      </div>
      
    
    <div className="feed" style={nightModeBG()}>
      <Favicon url={Favico}></Favicon>
      <ModuleHandler autoRefresh={autoRefreshTimer} refresh={manuelRefresh} nightMode={nightMode}  />
    </div>
    </div>
  );
}

