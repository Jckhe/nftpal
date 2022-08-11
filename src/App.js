import { ModuleHandler} from './ModuleHandler';
import './Styles/App.css';
import React from 'react';
import feedBG from './assets/feedbg.jpg'

export function App() {
    

  return (
    <div className="feed" style={{
      backgroundImage: `url(${feedBG})`,
      backgroundSize: "cover"
    }}>
      <ModuleHandler  />
    </div>
  );
}

