import React, {useEffect, useState} from 'react';
import './Styles/ModuleHandler.css'
import scrollbg from './assets/vector.png'
import sword from './assets/finnsword.png'
import wood from './assets/wooden.png'
import bmo from './assets/bmo.png'
import playButton from './assets/button.png'
import eth from './assets/ethereum.svg'
import { SupplyModule, SalesModule, VolumeModule, HoldersModule, HolderRatioModule, FeeModule, FloorPriceModule } from './Stats';


export function Module (props) {
    //info variables
    let defaultTrigger = props.default;
    const [slug, setSlug] = useState(props.slug)
    const [name, setName] = useState();
    const [collectionImage, setImage] = useState();
    //stats
    const [sales, setSales] = useState();
    const [floorPrice, setFloorPrice] = useState();
    const [supply, setSupply] = useState();
    const [volume, setVol] = useState();
    const [holders, setHolders] = useState();
    const [holderRatio, setRatio] = useState();
    const [royaltyFee, setFee] = useState();
    //hover usestates
    const [defaultMod, setDefault] = useState(defaultTrigger)
    let url = `https://api.opensea.io/api/v1/collection/${slug}`
    console.log(defaultTrigger)
    console.log(props)

    



    useEffect(() => {
        
        const options = {method: 'GET'};
        if (defaultMod !== undefined) {
            setSlug("proof-moonbirds")
        }
        fetch(url, options)
        .then(response => response.json())
        .then(response => {
            let stats = response.collection.stats;
            const fee = () => {
                const jsonFee = response.collection.primary_asset_contracts[0].seller_fee_basis_points / 100
                const percentageFee = jsonFee.toString() + "%"
                return percentageFee; 
            }
            setFloorPrice(stats.floor_price)
            setName(response.collection.primary_asset_contracts[0].name)
            setImage(response.collection.image_url)
            setSales(stats.total_sales)
            setSupply(stats.total_supply)
            setVol(Math.round(stats.total_volume))
            setHolders(stats.num_owners)
            setRatio((stats.total_supply/stats.num_owners).toFixed(2))
            setFee(fee())

            
        })
        .catch(err => console.error(err));
    }, [])


    return (
        <>
        <div className="info">
        <img className="moduleImg" alt="" height="120px" width="120px" src={collectionImage}/>
            <div className="nameContainer">
                <div className="scrollcontainer">
                    <img alt="" className="scroll" src={scrollbg}/>
                </div>
                <div className="name">
                    <h1 className="cname">{name}</h1>
                </div>
            </div> 
        </div>
        <div className="bottom">
            <SupplyModule supply={supply}/>
            <SalesModule sales={sales}/>
            <VolumeModule volume={volume} />
            <HoldersModule holders={holders} />
            <HolderRatioModule holderRatio={holderRatio} />
            <FeeModule royaltyFee={royaltyFee} />
            <FloorPriceModule floorPrice={floorPrice} />
            <div className="controls">

            </div>
        </div>
        </>
    )
}



export function ModuleHandler (props) {

    return (
        <>
        <div className="row">
            <div className="module"><Module default="true" /></div>
            <div className="module"><Module slug="thelittlesnft" /></div>
            <div className="module"></div>
        </div>
        <div className="row">
            <div className="module"></div>
            <div className="module"></div>
            <div className="module"></div>
        </div>
        </>
    )
}

