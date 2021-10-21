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
import API from './api';
import UpcomingMints from './components/UpcomingMints';
import Faq from './components/Faq';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {collections: []};
  }


  async componentDidMount(){
    this.initReactGA();

    try {
      const response = await API.get(`get_collections`);

      this.setState({collections: response.data});

    } catch (err) {
      
    }
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
              <RarityCollections collections={this.state.collections}/>
            </Route>

            <Route path="/c/">
              <RarityCollections collections={this.state.collections}/>
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/upcoming-mints">
              <UpcomingMints />
            </Route>

            <Route path="/faq">
              <Faq />
            </Route>

          </Switch>

      </Router>
    );
  }

}

export default App;
