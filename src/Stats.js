import {React, useEffect, useState} from 'react';
import playButton from './assets/button.png'
import './Styles/Stats.css'
import bmo from './assets/bmo.png'
import { Icon } from '@iconify/react';



//Each "stat module" is a div/container in the module 
export function SalesModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("playButtonHoverFalse")
    let sales = props.sales;

        
    return (
        <div onMouseEnter={() => setStatInfoStyle("playButtonHoverTrue")}
        onMouseLeave={() => setStatInfoStyle("playButtonHoverFalse")}
        className="stats">
            <div className="stats-left">
                <img 
                alt="" className={statInfoStyle}  src={playButton}/>
                <span className="stats-info">Sales: </span>
            </div>
            <div className="stats-right">
                    <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
                    <span className="stats-val">{sales}</span>
            </div>
        </div>
    )
}

export function SupplyModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("playButtonHoverFalse")
    let supply = props.supply;

        
    return (
        <div onMouseEnter={() => setStatInfoStyle("playButtonHoverTrue")}
        onMouseLeave={() => setStatInfoStyle("playButtonHoverFalse")}
        className="stats">
            <div className="stats-left">
                <img alt="" className={statInfoStyle}  src={playButton}/>
                <span className="stats-info">Supply: </span>
            </div>
            <div className="stats-right">
                    <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
                    <span className="stats-val">{supply}</span>
            </div>
        </div>
    )
}

export function VolumeModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("bigPlayButtonFalse")
    let volume = props.volume;

        
    return (
        <div onMouseEnter={() => setStatInfoStyle("bigPlayButtonTrue")}
        onMouseLeave={() => setStatInfoStyle("bigPlayButtonFalse")}
        className="stats">
            <div className="stats-left">
                <img
                alt="" className={statInfoStyle}  src={playButton}/>
                <span className="stats-info">Total Volume: </span>
            </div>
            <div className="stats-right">
                    <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
                    <span className="stats-val">{volume}</span>
            </div>
        </div>
    )
}

export function HoldersModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("bigPlayButtonFalse")
    let holders = props.holders;

        
    return (
        <div onMouseEnter={() => setStatInfoStyle("bigPlayButtonTrue")}
        onMouseLeave={() => setStatInfoStyle("bigPlayButtonFalse")}
        className="stats">
            <div className="stats-left">
                <img 
                alt="" className={statInfoStyle}  src={playButton}/>
                <span className="stats-info"># of Holders: </span>
            </div>
            <div className="stats-right">
                    <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
                    <span className="stats-val">{holders}</span>
            </div>
        </div>
    )
}


export function HolderRatioModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("bigPlayButtonFalse")
    let holderRatio = props.holderRatio;

        
    return (
        <div  onMouseEnter={() => setStatInfoStyle("bigPlayButtonTrue")}
        onMouseLeave={() => setStatInfoStyle("bigPlayButtonFalse")}
        className="stats">
            <div className="stats-left">
                <img
                alt="" className={statInfoStyle}  src={playButton}/>
                <span className="stats-info">Holder Ratio: </span>
            </div>
            <div className="stats-right">
                    <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
                    <span className="stats-val">{holderRatio}</span>
            </div>
        </div>
    )
}


export function FeeModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("bigPlayButtonFalse")
    let royaltyFee = props.royaltyFee;

        
    return (
        <div onMouseEnter={() => setStatInfoStyle("bigPlayButtonTrue")}
        onMouseLeave={() => setStatInfoStyle("bigPlayButtonFalse")} className="stats">
            <div className="stats-left">
                <img  
                
                alt="" className={statInfoStyle}  src={playButton}/>
                <span className="stats-info">Royalty Fee: </span>
            </div>
            <div className="stats-right">
                    <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
                    <span className="stats-val">{royaltyFee}</span>
            </div>
        </div>
    )
}


export function FloorPriceModule(props) {
    const [statInfoStyle, setStatInfoStyle] = useState("bigPlayButtonFalse")
    let floorPrice = props.floorPrice;

        
    return (
        <div onMouseEnter={() => setStatInfoStyle("bigPlayButtonTrue")}
        onMouseLeave={() => setStatInfoStyle("bigPlayButtonFalse")}
        className="stats">
        <div className="stats-left">
        <img alt="" className={statInfoStyle}  src={playButton}/>
            <span className="stats-info">Floor Price:</span>
        </div>
        <div id="floorpricediv"className="stats-right">
            <img alt="" className="bmo" width="120px" height="45px" src={bmo}/>
            <span id="floorprice" className="stats-val">{floorPrice}<Icon icon="fa-brands:ethereum" className="eth" width="10" height="20" /></span>
        </div>
    </div> 
    )
}