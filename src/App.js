import { ModuleHandler} from './ModuleHandler';
import './Styles/App.css';
import React, { useEffect } from 'react';
import feedBG from './assets/feedbg.jpg'
import Favico from './assets/favicon.png'
import Favicon from "react-favicon";

export  function App() {
    
  useEffect(() => {
    document.title = 'NFTPal'
  })

  return (
    <div className="feed" style={{
      backgroundImage: `url(${feedBG})`,
      backgroundSize: "cover"
    }}>
      <Favicon url={Favico}></Favicon>
      <ModuleHandler  />
    </div>
  );
}

