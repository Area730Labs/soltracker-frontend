import React from 'react';
import API from '../api';
import ReactGA from 'react-ga';

import 'three-dots/dist/three-dots.css'

class RarityCheck extends React.Component {
    constructor(props) {
        super(props);
    
        this.onCheckClicked = this.onCheckClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
        this.state = {inputValue: '', isError: false, imageUrl: '', rank: 0, isLoading: false, isImageLoading: false, delayOver: true}
    }

    componentDidMount(){
        ReactGA.pageview('/rarity/' + this.props.collection_slug);
    }

    isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onCheckClicked(e){
        if (this.state.inputValue && (this.state.inputValue.length) > 0 && this.isNumeric(this.state.inputValue))
        {
            this.setState({isError: false, isLoading: true, isImageLoading: false, delayOver: false});

            try {
                const response = await API.get(`check_rank/${this.props.collection_id}/${this.state.inputValue}`);

                this.setState({
                    isLoading: false,
                    imageUrl: response.data.url,
                    rank: response.data.rank,
                    isImageLoading: true
                });

                await this.sleep(1000);

                this.setState({delayOver: true})

                window.scrollTo(0,document.body.scrollHeight);

            } catch (err) {
                this.setState({
                    isLoading: false,
                    isError: true,
                    isImageLoading: false,
                    delayOver: true
                });
            }
        } else {
            this.setState({isError: true});
        }
    }

    handleChange(e){
        this.setState({inputValue: e.target.value});
    }
    

    render() {
        const collectionName = this.props.collection_name;

        let isError = this.state.isError;
        let isImage = !isError && this.state.imageUrl.length > 0;
        let hasRank = !isError && this.state.rank > 0;
        let isLoading = this.state.isLoading;

        const total_count = this.props.total_count;
        const markets = this.props.markets;

        let part_1 = []
        let part_2 = []

        for(let i=0;i<3 && i<markets.length;i++){
            part_1.push(markets[i])
        }

        for(let i=3;i<6 && i<markets.length;i++){
            part_2.push(markets[i])
        }


        return (
            <main class="form-signin text-center p-0 pb-1">
                <div className="d-flex align-items-center p-3 my-2 text-white bg-purple rounded shadow-sm align-center">
                    <h3 className="h5 mb-0 text-white lh-1 float-right">{collectionName}</h3>
                </div>

                <div className="my-1 px-3 py-2 bg-body rounded shadow-sm">

                    <img className="mb-2 rounded-circle" src={this.props.icon_url} alt="" width="150" height="150" />


                    <div className="btn-group btn-group-sm pb-2 w-100" role="group" aria-label="Small button group">
                        <button type="button" className="btn btn-outline-social" onClick={()=> window.open(this.props.website, "_blank")}><img width="18px" src={require('../img/icons/website.png').default} /><span className="p-1" >Website</span></button>
                        <button type="button" className="btn btn-outline-social" onClick={()=> window.open('https://twitter.com/' + this.props.twitter, "_blank")}><img width="18px" src={require('../img/icons/twitter.png').default} /><span className="p-1" >Twitter</span></button>
                        <button type="button" className="btn btn-outline-social" onClick={()=> window.open(this.props.discord, "_blank")}><img width="18px" src={require('../img/icons/discord.png').default} /><span className="p-1" >Discord</span></button>
                    </div>



                   
                    {/* <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Find by rank</label>
                    </div> */}

                    

                    <div className="btn-group btn-group-sm text-center w-100 d-block mt-2 mb-1" >
                        {part_1.map((market, i) => {
                            return (<span className="pr-1 px-1"><img width="22px" src={require('../img/icons/tag.png').default} /><a href={market.url} target="_blank" className="link-primary">{market.name}</a></span>)
                        })}
                    </div>

                    {part_2.length > 0 && (
                        <div className="btn-group btn-group-sm text-center  w-100 d-block mb-1" >
                            {part_2.map((market, i) => {
                                return (<span className="pr-1 px-1"><img width="22px" src={require('../img/icons/tag.png').default} /><a href={market.url} target="_blank" className="link-primary">{market.name}</a></span>)
                            })}
                        </div>
                    )}

                    
                    
                    {/* <h1 className="h3 mb-3 fw-normal">Check your NFT rarity!</h1> */}

                    <div className="btn-group  btn-group-sm w-100 mt-2 mb-2" role="group" aria-label="Choose mode">
                        <button type="button" className="btn btn-outline-primary active">By ID</button>
                        <button type="button" className="btn btn-outline-primary">By Rank</button>
                    </div>

                    {isError && (
                        <div className="alert alert-danger smaller_alert" role="alert">
                            Wrong number
                        </div>
                    )}

                    <div className="form-floating">
                        <input type="number" className="form-control" id="floatingInput" placeholder="1234" value={this.state.inputValue} onChange={this.handleChange}/>
                        <label htmlFor="floatingInput">NFT number (e.g. 0554)</label>
                    </div>

                    <button type="button" className="w-100 btn btn-lg btn-primary mt-2" onClick={this.onCheckClicked}>Check Rarity</button>

                    {!isLoading && hasRank && this.state.delayOver && (
                        <p className="mt-5 mb-3"><h4>Rank: <strong>{this.state.rank}/{total_count}</strong></h4></p>
                    )}

                    {(isLoading || this.state.isImageLoading || !this.state.delayOver) && (
                        <div className="w-100 form-floating d-flex justify-content-center p-3">
                            <div class="dot-typing"></div>
                        </div>
                    )}


                    {!isLoading && isImage && (
                        <img className="w-100" 
                            style={(!this.state.isImageLoading && this.state.delayOver) ? {} : {display: 'none'}}
                            src={this.state.imageUrl}
                            onLoad={() => this.setState({isImageLoading: false})}
                        />

                        // <img className="w-100" src={this.state.imageUrl} />
                    )}

                </div>
            </main>
           
        );
    }
}


export default RarityCheck;
