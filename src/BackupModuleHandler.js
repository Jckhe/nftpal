import React, {useEffect, useState} from 'react';
import './Styles/ModuleHandler.css'
import scrollbg from './assets/vector.png'
import sword from './assets/finnsword.png'
import sword2 from './assets/finnsword2.png'
import delButton from './assets/deletebutton.jpg'
import delButton2 from './assets/close.png'
import lightBulb2 from './assets/lightbulb2.png'
import exampleSlug from './assets/example.png'
import refButton from './assets/refresh.png'
import questionMark from './assets/question-mark.png'
import loadingScreen from './assets/cool.gif'
import osicon from './assets/opensea.svg'
import esicon from './assets/etherscan.svg'
import nerdicon from './assets/nftnerd.svg'
import playButton from './assets/button.png'
import { SupplyModule, SalesModule, VolumeModule, HoldersModule, HolderRatioModule, FeeModule, FloorPriceModule } from './Stats';



//this component handles the modules and their orientation within the feed.
//Essentially this component is the main parent of all the modules.
export function ModuleHandler ({...props}) {
    //usestate props that will be toggled whenever these props are passed in. Refresh/Nightmode. If props aren't passed in, then 
    //they won't trigger anything.
    const [manualRefresher, toggleRefresh] = useState(props.refresh);
    let nightMode = props.nightMode;

    useEffect(() => {
        //handles persist 
        const sessionSlug = localStorage.getItem("slug")
        //Refreshes all modules
        if (props.autoRefresh !== 0) {
            toggleRefresh(true)
        }
        toggleRefresh()
        if (sessionSlug) {
            console.log(sessionSlug)
        }
    }, [props.refresh, props.autoRefresh])

    return (
        <>
        <div className="row">
            <Module autoRefresh={props.autoRefresh} refresh={props.refresh} nightMode={nightMode} default={true} />
            <Module autoRefresh={props.autoRefresh} refresh={props.refresh} nightMode={nightMode} />
            <Module autoRefresh={props.autoRefresh} refresh={props.refresh} nightMode={nightMode} default2={true}/>
        </div>
        <div className="row">
            <Module autoRefresh={props.autoRefresh} refresh={props.refresh}nightMode={nightMode}  />
            <Module autoRefresh={props.autoRefresh} refresh={props.refresh}nightMode={nightMode} default3={true} />
            <Module autoRefresh={props.autoRefresh} refresh={props.refresh}nightMode={nightMode} />
        </div>
        </>
    )
}


//this Module handles the process between the search and the intialization (passing the slug over)
function Module (props) {
    const [init, setInit] = useState(false);
    const [slug, setSlug] = useState('');
    const [defaultModule, setDefault] = useState(props.default)
    const [savedSession, toggleSaved] = useState();
    let defaultModule2 = props.default2;
    let defaultModule3 = props.default3;
    
    
    let nightMode = props.nightMode;


    const initHandler = (e) => {
        setSlug(e);
        setInit(true)
    }

    const delHandler = (e) => {
        setSlug('')
        setDefault()
        setInit(false)
    }

    const savedChecker = (data) => {
        toggleSaved(true)
        setSlug(data)
    }

    useEffect(() => {
        if (savedSession) {
            setInit(true)
        }
        if (defaultModule === true || defaultModule2 === true || defaultModule3 === true) {
            setInit(true)
        }
        
    }, [savedSession])

    if (init === false) {
        return (
            <>
            <ModuleSearch nightMode={nightMode} func={initHandler} />
            </>
        )
    } else {
        return (
            <>
            <LoadingScreenComp saved={savedChecker} autoRefresh={props.autoRefresh} refresh={props.refresh} nightMode={nightMode} default3={defaultModule3} default2={defaultModule2} default={defaultModule} func={delHandler} slug={slug} />
            </>
        )
    }
}



//this component handles the loading screen animation in between the search module and the initialized module.
//the loading screen is purely for entertainment, stylistic purposes since it makes the module look more robust.
function LoadingScreenComp (props) {
    // animation/style handling here for the loading screen
    const [animationClass, setClass] = useState("loadingScreen1")
    const [loading, setLoading] = useState(true);
    //default Modules - these are only here to be passed into ModuleInit 
    let defaultModule = props.default;
    let defaultModule2 = props.default2;
    let defaultModule3 = props.default3;
    let slug = props.slug;
    let delHandler = props.func;
    let nightMode = props.nightMode;
    let saved = props.saved;


    //set the slug for default modules here
    if (defaultModule === true) {
        slug = "proof-moonbirds"
    }

    if (defaultModule2 === true) {
        slug = "boredapeyachtclub"
    }

    if (defaultModule3 === true) {
        slug = "azuki"
    }



    //nightMode style handler
    const nightModeHandler = () => {
        if (nightMode === true) {
            return {
                backgroundColor: '#6B8074'
            }
        } else {
            return {
                backgroundColor: '#A8DBA8'
            }
        }
    }
    

    useEffect(() => {
        if (props.refresh || props.autoRefresh !== 0) {
            console.log("hey")
            setLoading(true)
        }
        
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
    }, [props.refresh, props.autoRefresh])


    // this clause will always run first before the ModuleInit is rendered because the useState of loading is set to true by default
    // -> Because this runs first, the useEffect will be activated afterwards to set Loading to false thus returning ModuleInit next.

    if (loading === true) {
        return (
            <div className='module' style={nightModeHandler()}>
                <div className="loadingScreenDiv">
                    <img src={loadingScreen} alt="loading screen"  className={animationClass} />
                </div>
            </div>
        )
    } else {
        return (
            <>
            <ModuleInit saved={saved} nightMode={nightMode} func={delHandler} slug={slug} />
            </>
        )
    }
}





//This is the search component of the module. Basically this is the pre-initialized state.
function ModuleSearch (props) {
    const [slugInput, slugInputter] = useState('');
    const [swordAnimation, setSwordAnimation] = useState(0);
    const [swordAnimation2, setSwordAnimation2] = useState(0);
    const [slugHelpStatus, toggleHelp] = useState(false);


    let nightMode = props.nightMode;

    const handleChange = (e) => {
        slugInputter(e.target.value)
    }

    //nightMode style handler
    const nightModeHandler = () => {
        if (nightMode === true) {
            return {
                backgroundColor: '#6B8074'
            }
        } else {
            return {
                backgroundColor: '#A8DBA8'
            }
        }
    }


    //Helper Div Stuff
    const slugHelperClick = () => {
        toggleHelp(true)
    }

    const delslugHelperClicker = () => {
        toggleHelp(false)
    }

    const slugHelper = () => {
        if (slugHelpStatus === true) {
            return (
                <div style={HelperDivStyling()} className='slugHelperDiv'>
                    <div className="slugHelperContent">
                        <img className="exampleSlug" height="50px" width="300px" src={exampleSlug} alt="" />
                        <p><strong>What is a slug?</strong></p>
                        <p>The slug of an NFT project can be found at the end of their opensea collection's URL. </p>
                        <p>{"For example, in the image above, the slug for Moonbirds is: "} <strong>'proof-moonbirds'</strong> {"(with the dash)"}</p>
                        <img onClick={()=> {delslugHelperClicker()}} src={delButton2} className="delButton3" alt="" height="18px" width="18px" />
                    </div>
                </div>
            )
        }
    }

    //style functions
    const rotateonClick = () => {
        let rotation = swordAnimation + 90;
        setSwordAnimation(rotation)
    }
    const rotateonClick2 = () => {
        let rotation = swordAnimation2 + 90;
        setSwordAnimation2(rotation)
    }

    const lightBulbStyleHandling = () => {
        if (slugHelpStatus === true) {
            return {
                bottom: "55px",
                opacity: '0',
                position: 'absolute'
            }
        }
    }

    const HelperDivStyling = () => {
        if (slugHelpStatus === true) {
            return {
                opacity: '0.8',
                transition: 'opacity 1s linear'
            }
        }
    }


    return (
        <div className='module' style={nightModeHandler()}>
        <div className="mainModuleSearchDiv">
            <div className="swordDiv" onClick={rotateonClick}><img style={{
                transform: `rotate(${swordAnimation}deg)`,
                transition: 'transform 0.1s linear'
            }} alt="sword" className="swordImg" height="50px" width="200px" src={sword} /></div>
            
            <div className="searchDiv">
                {slugHelper()}
            <div className="lightBulbDiv">
                <img style={lightBulbStyleHandling()} onClick={()=> {slugHelperClick()}}src={lightBulb2} alt="" height="50px" width="50px" />
            </div>
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
            <div className="swordDiv" onClick={rotateonClick2}><img style={{
                transform: `rotate(${swordAnimation2}deg)`,
                transition: 'transform 0.1s linear'
            }} alt="dsword" className="swordImg" height="50px" width="200px" src={sword2} /></div>
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
    const [refreshHelp, toggleRefHelp] = useState(false);
    const [savePrompt, setSavePrompt] = useState();
    //style
    const [cnamelength, setcname] = useState('cname');
    //important usestate here: basically will check if this module has been initialized 
    const [init, toggleInit] = useState(false);
    

    //props and etc
    let nightMode = props.nightMode;
    let url = `https://api.opensea.io/api/v1/collection/${slug}`
    let delHandler = props.func;

    const nightModeHandler = () => {
        if (nightMode === true) {
            return {
                backgroundColor: '#6B8074'
            }
        } else {
            return {
                backgroundColor: '#A8DBA8'
            }
        }
    }

    //Manual Refresh Function

    const refHandler = () => {
        fetchCollection(url)
    }

    //Helper Div Stuff
    const refHelpClick = () => {
        toggleRefHelp(true)
    }

    const delRefHelp = () => {
        toggleRefHelp(false)
    }

    const refreshDiv = () => {
        if (refreshHelp === true) {
            return (
                <div className="refreshHelpDiv">
                    <img onClick={() => {delRefHelp()}} id="rhelpdelbutton" className="delButton2" src={delButton2} height="18px" width="18px" alt="delete button 2" />
                    <p className="refreshHelpContent">If nothing changes after refreshing, it usually just means that there's nothing to update or refresh regarding the stats of the collection. Try again later when you think thing's might've changed!</p>
                </div>
            )
        }
    }

    

    //save stuff

    const handleSaver = () => {
        localStorage.setItem("slug", slug)
        setSavePrompt();
    }
    const SavePrompt = (
        <div className="ImageDiv">
        <span onClick={handleSaver} className='start-btn'>Save ?</span>
        </div>
    )

    

    const handleSaveClick = () => {
        setTimeout(() => {
            setSavePrompt(true)
        }, 1000);
    }



    //main function to fetch the data from the Opensea API, then sets the useState variables accordingly.
    const fetchCollection = (collectionUrl) => {
        const options = {method: 'GET'};
        fetch(collectionUrl, options)
        .then(response => response.json())
        .then(response => {
            let stats = response.collection.stats;
            let contract = response.collection.primary_asset_contracts[0].address;
            let floorPrice = stats.floor_price;
            let collectionName = response.collection.primary_asset_contracts[0].name;

            const fee = () => {
                const jsonFee = response.collection.primary_asset_contracts[0].seller_fee_basis_points / 100
                const percentageFee = jsonFee.toString() + "%"
                return percentageFee; 
            }

            const floorPriceParser = (floorPrice) => {
                if (floorPrice < 1) {
                    return Number.parseFloat(floorPrice).toFixed(3)
                } else {
                    return Number.parseFloat(floorPrice).toFixed(2)
                }
            }
            
            setFloorPrice(floorPriceParser(floorPrice))
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
            if (collectionName.length > 18) {
                setcname('cname2')
            } else if (collectionName.length > 12) {
                setcname('cname1')
            }
            
        })
        
    }

    const ModuleImg = (
        <img onClick={handleSaveClick} className="moduleImg" alt="" height="120px" width="120px" src={collectionImage}/>
    )

    
    useEffect(() => {
        const session = localStorage.getItem("slug")
        if (session) {
            props.saved(slug)
        }
        fetchCollection(url);
    }, [SavePrompt])


    return (
        <div className="module" style={nightModeHandler()}>
        <div className="info">
            <div className="deleteButtonDiv">
                <img alt="delete button" onClick={() => {delHandler()}} src={delButton} height="40px" width="40px" />
            </div>
            <div className="refreshButtonDiv">
                <img alt="refresh button" onClick={() => {refHandler()}} src={refButton} height="40px" width="40px" />
            </div>
            <div className="questionMarkDiv">
                <img onClick={()=> {refHelpClick()}}alt="questionMark" src={questionMark} className="question-mark" height="16px" width="16px" />
            </div>
            {refreshDiv()}
            {!savePrompt && ModuleImg}
            {savePrompt && SavePrompt}
            <div className="nameContainer">
                <div className="scrollcontainer">
                    <img alt="" className="scroll" src={scrollbg}/>
                </div>
                <div className="name">
                    <h1 className={cnamelength}>{name}</h1>
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
