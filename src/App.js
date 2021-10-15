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
import { useHistory } from "react-router-dom";


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

    return (
      <Router>

        <Header />
        

          <Switch>
            <Redirect exact from="/" to="/rarity" />

            <Route path="/rarity/">
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
