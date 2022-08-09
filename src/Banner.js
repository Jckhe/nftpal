import React from 'react';
import bannerPNG from './assets/nftpalbanner.png'
import './Styles/Banner.css'



export function Banner (props) {
    return (
        <div className="header">
            <div className="banner">
                <img alt="NFTPal Banner" src={bannerPNG}/>
                <div className="menu">
                    <button><span>About</span></button>
                    <button><span>Help</span></button>
                </div>
            </div>
 
        </div>
    )
}
