import React from 'react';
import bannerPNG from './assets/nftpalbanner.png'
import './Styles/Banner.css'



export function Banner (props) {
    return (
        <div className="header">
            <div className="banner">
                <img alt="NFTPal Banner" src={bannerPNG}/>
                <div className="menu">
                    <div className="buttonHolder"><a href='https://github.com/Jckhe/nftpal/blob/master/src/ModuleHandler.js' target="_blank" alt=''><button className="button-74" role="button"><span id="About">Github</span></button></a></div>
                    <div className="buttonHolder2"><button className="button-74" role="button"><span id="Help">Help</span></button></div>
                </div>
            </div>
 
        </div>
    )
}
