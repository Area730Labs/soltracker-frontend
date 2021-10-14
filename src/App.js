import logo from './logo.svg';
import './App.css';
import React from 'react';
import Async from 'react-async';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.onCheckClicked = this.onCheckClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {inputValue: '', isError: false, imageUrl: '', rank: 0, isLoading: false}
  }

  isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  onCheckClicked(e){
    if ((this.state.inputValue.length) > 0 && this.isNumeric(this.state.inputValue))
    {
      this.setState({isError: false});

      fetch("http://127.0.0.1:8000/check_yeti_rank/" + this.state.inputValue)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error){
            this.setState({
              isLoading: false,
              isError: true
            });
          } else {
            this.setState({
              isLoading: false,
              isError: false,
              imageUrl: result.url,
              rank: result.rank
            });
          }
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoading: false,
            isError: true
          });
        }
      )

    } else {
      this.setState({isError: true});
    }
  }

  handleChange(e){
    this.setState({inputValue: e.target.value});
  }

  render(){
    let isError = this.state.isError;
    let isImage = this.state.imageUrl.length > 0;
    let hasRank = this.state.rank > 0;

    return (
      <form>
          <h1 className="h3 mb-3 fw-normal">Check your Yeti rarity</h1>

          {isError && (
            <div className="alert alert-danger" role="alert">
              Wrong number
            </div>
           )}
  
          <div className="form-floating">
            
            <input type="number" className="form-control" id="floatingInput" placeholder="1234" value={this.state.inputValue} onChange={this.handleChange}/>
            <label for="floatingInput">Yeti number</label>
          </div>
          <button type="button" className="w-100 btn btn-lg btn-primary mt-4" onClick={this.onCheckClicked} >Check</button>

          {hasRank && (
            <p className="mt-5 mb-3"><h4>Rank: <strong>{this.state.rank}</strong></h4></p>
           )}


          {isImage && (
            <img className="w-100" src={this.state.imageUrl} />
           )}

          
        </form>
    );
  }

}

export default App;
