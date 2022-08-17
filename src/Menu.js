import "./Styles/Menu.css";
import React from "react";
import playButton from './assets/button.png'
import useState from 'react-usestateref'


export const NightModeToggle = (props) => {

    const [nightModeStatus, toggleNightMode, nightModeRef] = useState(true);
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
        <>
          <div className="buttonLabelDiv" style={{
            backgroundImage: `url(${playButton})`,
            backgroundSize: 'cover'
          }}
          onClick={handleClick}>
            
            <span id="NightModeLabel">Night mode: <strong>{nightModeChecker()}</strong></span>
            </div>
        </>
    )
}

export const ManualRefreshButton = (props) => {
    const [refreshStatus, toggleRefreshAnimation] = useState('Refresh All')

    const refreshAnimation = () => {
        setTimeout(() => {
            toggleRefreshAnimation('Refreshing')
            setTimeout(() => {
                toggleRefreshAnimation('Refreshing.')
                setTimeout(() => {
                    toggleRefreshAnimation('Refreshing..')
                    setTimeout(() => {
                        toggleRefreshAnimation('Refreshing...')
                        setTimeout(() => {
                            toggleRefreshAnimation('Refresh All')
                        }, 350);
                    }, 400);
                }, 400);
            }, 400);
        }, 5);
    }

    return (
        <>
        
        <div onClick={() => {
            refreshAnimation();
            props.refresh();
        }} className="buttonLabelDiv2" style={{
            backgroundImage: `url(${playButton})`,
            backgroundSize: 'cover'
          }}
          >
            <span id="ManualRefreshLabel">{refreshStatus}</span>
          </div>
        </>
    )
}

export const AutoRefreshButton = (props) => {
    const [refreshStatus, toggleRefreshStatus] = useState(false);
    const [clickedStatus, setClickedStatus] = useState("2")


    const clickedChecker = (num) => {
        console.log(num)
    }
    //style handling
    const autoRefreshStatusSpan = () => {
        if (refreshStatus === true) {
            return 'ON'
        } else {
            return 'OFF'
        }
    }

    //style
    const int1styler = (e) => {
        if (e.currentTarget.id === clickedStatus) {
            return {
                backgroundColor: "red"
            }
        }
    }


    return (
        <>
        <div className="autorefreshoptions">
            <div className="auto1" id="1" onClick={() => {clickedChecker(1)}} ><input type="checkbox" id="demo"/>
<label className="a1label" htmlFor="demo"><span>3m</span></label></div>
            <div className="auto2" id="2" onClick={() => {clickedChecker(2)}} ><input type="checkbox" id="demo2"/>
<label className="a2label" htmlFor="demo2"><span>5m</span></label></div>
            <div className="auto3" id="3" onClick={() => {clickedChecker(3)}} ><input type="checkbox" id="demo3"/>
<label className="a3label" htmlFor="demo3"><span>10m</span></label></div>
        </div>
        <div onClick={() => {
            toggleRefreshStatus(!refreshStatus)
            props.func();
        }} className="buttonLabelDiv3" style={{
            backgroundImage: `url(${playButton})`,
            backgroundSize: 'cover'
          }}
          >
            <span id="AutoRefreshLabel">Auto-Refresh: {autoRefreshStatusSpan()}</span>
          </div>
        </>
    )
}