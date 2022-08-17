import { ModuleHandler } from './ModuleHandler';
import './Styles/App.css';
import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import feedBG from './assets/feedbg4.jpg'
import nightBG from './assets/nightmode.jpg'
import Favico from './assets/favicon.png'
import Favicon from "react-favicon";
import { AutoRefreshButton, ManualRefreshButton, NightModeToggle } from './Menu';


export  function App() {

  const [nightMode, setNightMode] = useState(true);
  const [manuelRefresh, toggleRefresh] = useState();
  const [autoRefresh, toggleAutoRefresh] = useState(false);
  const [autoRefreshTimer, setRefreshTimer] = useState(0);


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
  //
  
  //manual refresh stuff
  const refreshClick = () => {
    toggleRefresh(true)
  }

  
  
  //props function
  const autoRefreshHandle = () => {
    toggleAutoRefresh(!autoRefresh)
  }

  


  useEffect(() => {
    document.title = 'NFTPal'
    if (autoRefresh === true) {
      setTimeout(() => {
          setRefreshTimer(autoRefreshTimer + 1);
        }, 60000);
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
          <AutoRefreshButton func={autoRefreshHandle} />
        </div>
      </div>
      
    
    <div className="feed" style={nightModeBG()}>
      <Favicon url={Favico}></Favicon>
      <ModuleHandler autoRefresh={autoRefreshTimer} refresh={manuelRefresh} nightMode={nightMode}  />
    </div>
    </div>
  );
}

