import React, {useEffect, useState} from 'react';
import './Styles/ModuleHandler.css'
import scrollbg from './assets/vector.png'
import sword from './assets/finnsword.png'
import dsword from './assets/dsword.png'
import sword2 from './assets/sword2.png'
import bmo from './assets/bmo.png'
import delButton from './assets/deletebutton.jpg'
import loadingScreen from './assets/cool.gif'
import osicon from './assets/opensea.svg'
import esicon from './assets/etherscan.svg'
import nerdicon from './assets/nftnerd.svg'
import playButton from './assets/button.png'
import { SupplyModule, SalesModule, VolumeModule, HoldersModule, HolderRatioModule, FeeModule, FloorPriceModule } from './Stats';



//this component handles the modules and their orientation within the feed.
//Essentially this component is the main parent of all the modules.
export function ModuleHandler (props) {

    return (
        <>
        <div className="row">
            <Module default={true} />
            <Module />
            <Module />
        </div>
        <div className="row">
            <Module />
            <Module />
            <Module />
        </div>
        </>
    )
}



//this component handles the loading screen animation in between the search module and the initialized module.
function LoadingScreenComp (props) {
    const [animationClass, setClass] = useState("loadingScreen1")
    const [loading, setLoading] = useState(true);
    let defaultModule = props.default;
    let slug = props.slug;
    let delHandler = props.func;

    if (defaultModule === true) {
        slug = "proof-moonbirds"
    }

    

    useEffect(() => {
        setTimeout(() => {
            setClass("loadingScreen2")
            setTimeout(() => {
                setClass("loadingScreen3")
                setTimeout(() => {
                    setClass("loadingScreen2")
                    setTimeout(() => {
                        setClass("loadingScreen3")
                        setTimeout(() => {
                            setLoading(false)
                        }, 100);
                    }, 200);
                }, 200);
            }, 300);
        }, 50);
    }, [])

    if (loading === true) {
        return (
            <div className="module">
                <div className="loadingScreenDiv">
                    <img src={loadingScreen} alt="loading screen"  className={animationClass} />
                </div>
            </div>
        )
    } else {
        return (
            <>
            <ModuleInit func={delHandler} slug={slug} />
            </>
        )
    }
}

//this Module handles the process between the search and the intialization (passing the slug over)
function Module (props) {
    const [init, setInit] = useState(false);
    const [slug, setSlug] = useState('');
    const [defaultModule, setDefault] = useState(props.default)
    



    const initHandler = (e) => {
        setSlug(e);
        setInit(true)
    }

    const delHandler = (e) => {
        setSlug('')
        setDefault()
        setInit(false)
    }

    useEffect(() => {
        if (defaultModule === true) {
            setInit(true)
        }
    }, [])

    if (init === false) {
        return (
            <>
            <ModuleSearch func={initHandler} />
            </>
        )
    } else {
        return (
            <>
            <LoadingScreenComp default={defaultModule} func={delHandler} slug={slug} />
            </>
        )
    }
}



//This is the search component of the module. Basically this is the pre-initialized state.
function ModuleSearch (props) {
    const [slugInput, slugInputter] = useState('')



    const handleChange = (e) => {
        slugInputter(e.target.value)
    }


    return (
        <div className="module">
        <div className="mainModuleSearchDiv">
            <div className="swordDiv"><img alt="sword" className="swordImg" height="50px" width="200px" src={sword} /></div>
            <div className="searchDiv">
                <div className="searchInputContainer">
                    <div className="scrollcontainer2">
                        <img alt="" className="scroll2" src={scrollbg}/>
                    </div>
                    <input onChange={handleChange} className="search" type="text" placeholder="ENTER SLUG"/>
                </div>
                <div className="searchSubmitContainer">
                    <div className="submitPlayButtonDiv">
                        <img alt="submit" src={playButton} className="submitPlayButton" />
                        <span>SUBMIT</span>
                    </div>
                    <div className="searchButtonDiv">
                        <input onClick={() => {props.func(slugInput)}} className="searchSubmit" type="submit" value=" " />
                    </div>
                    
                    </div>
            </div>
            <div className="swordDiv"><img alt="dsword" className="swordFlipped" height="50px" width="200px" src={sword} /></div>
        </div>
        </div>
    )
}



//This is the intialized component of the module.
export function ModuleInit (props) {
    //info variables
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
    //links/control variables
    const [opensea, setOS] = useState();
    const [nftnerd, setNerd] = useState();
    const [etherscan, setES] = useState();

    let url = `https://api.opensea.io/api/v1/collection/${slug}`

    let delHandler = props.func;


    const fetchCollection = (collectionUrl) => {
        const options = {method: 'GET'};
        fetch(collectionUrl, options)
        .then(response => response.json())
        .then(response => {
            let stats = response.collection.stats;
            let contract = response.collection.primary_asset_contracts[0].address;

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
            setOS(`https://opensea.io/collection/${slug}`)
            setNerd(`https://nftnerds.ai/collection/${contract}/liveview`)
            setES(`https://etherscan.io/address/${contract}`)


            .catch(err => console.error(err));
        })
        
    }
    
    useEffect(() => {
        fetchCollection(url)
    }, [])


    return (
        <div className="module">
        <div className="info">
            <div className="deleteButtonDiv">
                <img alt="delete button" onClick={() => {delHandler()}} src={delButton} height="40px" width="40px" />
            </div>
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
                <div className="osdiv"><a target="_blank" alt="OpenSea" href={opensea}><img src={osicon} height="25px" width="25px" /></a></div>
                <div className="esdiv"><a target="_blank"  alt="Etherscan" href={etherscan}><img src={esicon} height="25px" width="25px" /></a></div>
                <div className="nerddiv"><a target="_blank" alt="NFTNerds" href={nftnerd}><img src={nerdicon} height="23px" width="23px" /></a></div>
            </div>
        </div>
        </div>
    )
}