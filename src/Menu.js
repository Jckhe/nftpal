import "./Styles/Menu.css";
import React from "react";
import playButton from './assets/button.png'
import useState from 'react-usestateref'


export const NightModeToggle = (props) => {

    const [nightModeStatus, toggleNightMode, nightModeRef] = useState(false);
    let propsFunc = props.func;


    const handleClick = () => {
        toggleNightMode(!nightModeStatus);
        propsFunc();
    }

    const nightModeChecker = () => {
        if (nightModeStatus === false) {
            return 'OFF'
        } else {
            return 'ON'
        }
    }


    return (
        <div className="nbuttonContainer">
          <div className="buttonLabelDiv" style={{
            backgroundImage: `url(${playButton})`,
            backgroundSize: 'cover'
          }}
          onClick={handleClick}>
            
            <span id="NightModeLabel">Night mode: <strong>{nightModeChecker()}</strong></span>
            </div>
        </div>
    )
}