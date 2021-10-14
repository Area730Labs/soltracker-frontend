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
        ReactGA.pageview('/rarity/solyetis');
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
                const response = await API.get(`check_yeti_rank/${this.state.inputValue}`);

            
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
                    isError: true
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
        const collectionName = "SolYetis";

        let isError = this.state.isError;
        let isImage = !isError && this.state.imageUrl.length > 0;
        let hasRank = !isError && this.state.rank > 0;
        let isLoading = this.state.isLoading;

        const total_count = 8888;

        return (
            <main class="form-signin text-center p-0 pb-1">
                <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                    <h3 className="h5 mb-0 text-white lh-1 ">{collectionName}</h3>
                </div>

                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <img className="mb-4 rounded-circle" src="https://pbs.twimg.com/profile_images/1442221544223219714/RnqT9oPb_400x400.jpg" alt="" width="150" height="150">

                    </img>
                    {/* <h1 className="h3 mb-3 fw-normal">Check your NFT rarity!</h1> */}

                    {isError && (
                    <div className="alert alert-danger smaller_alert" role="alert">
                        Wrong number
                    </div>
                    )}

                    <div className="form-floating">
                        <input type="number" className="form-control" id="floatingInput" placeholder="1234" value={this.state.inputValue} onChange={this.handleChange}/>
                        <label htmlFor="floatingInput">NFT number (e.g. 1554)</label>
                    </div>

                    <button type="button" className="w-100 btn btn-lg btn-primary mt-4" onClick={this.onCheckClicked} >Check</button>

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
