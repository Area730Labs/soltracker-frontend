import './App.css';
import React from 'react';
import ReactGA from 'react-ga';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Header from './components/Header';
import About from './components/About';
import RarityCollections from './components/RarityCollections';
import Maintenance from './components/Maintenance';


import RarityCheck from './components/RarityCheck';

class App extends React.Component {
  constructor(props) {
    super(props);

  }


  componentDidMount(){
    this.initReactGA();
  }

  initReactGA() {
    ReactGA.initialize('UA-210252634-1');
  };

  render(){

    const maintenance = false;

    if (maintenance){
      return (
        <Maintenance />
      );
    }

    return (

  
      <Router>

        <Header />
        

          <Switch>
            <Redirect exact from="/" to="/rarity" />

            <Route path="/rarity/">
              <RarityCollections />
            </Route>

            <Route path="/c/">
              <RarityCollections />
            </Route>

            <Route path="/about">
              <About />
            </Route>
          </Switch>


      </Router>
    );
  }

}

export default App;
