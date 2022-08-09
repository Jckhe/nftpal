import { ModuleHandler} from './ModuleHandler';
import './Styles/App.css';
import React from 'react';
import feedBG from './assets/feedbg.jpg'

export function App() {

  // const handleClick = () => {
  //   const options = {method: 'GET'};
  //   fetch('https://api.opensea.io/api/v1/collection/doodles-official', options)
  //     .then(response => response.json())
  //     .then(response => {
  //       let collection = response.collection;
  //       let obj = {};
  //       console.log(collection)

  //       for (const key in collection) {
  //         // if (typeof collection[key] === 'string' || typeof collection[key] === 'number' ) {
  //           let value = collection[key].toString();
  //           obj[key] = value;
  //         // }
  //       }
        
  //       setVals(obj)
  //     })
  //     .catch(err => console.error(err));
  // }
    

  return (
    <div className="feed" style={{
      backgroundImage: `url(${feedBG})`,
      backgroundSize: "cover"
    }}>
      <ModuleHandler  />
    </div>
  );
}

