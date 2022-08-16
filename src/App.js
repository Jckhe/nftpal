import { ModuleHandler } from './ModuleHandler';
import './Styles/App.css';
import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import feedBG from './assets/feedbg4.jpg'
import nightBG from './assets/nightmode.jpg'
import Favico from './assets/favicon.png'
import Favicon from "react-favicon";
import { ManualRefreshButton, NightModeToggle } from './Menu';


export  function App() {

  const [nightMode, setNightMode] = useState(true)
  const [manuelRefresh, toggleRefresh, manuelRefreshRef] = useState()

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

  


  useEffect(() => {
    document.title = 'NFTPal'
    toggleRefresh();
  }, [manuelRefresh])

  return (
    <div className="body" style={nightModeHandler()}>
      <div className="switch">
        <div className="nbuttonContainer">
          <NightModeToggle func={nightModeFunc} />
          <ManualRefreshButton refresh={refreshClick} />
        </div>
      </div>
      
    
    <div className="feed" style={nightModeBG()}>
      <Favicon url={Favico}></Favicon>
      <ModuleHandler refresh={manuelRefresh} nightMode={nightMode}  />
    </div>
    </div>
  );
}

