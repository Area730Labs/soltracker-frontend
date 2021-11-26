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
import Bots from './components/Bots';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.checkFloors = this.checkFloors.bind(this);

    this.state = {collections: [], upcoming_collections: [], floors: [], floor_interval_id: null};
  }


  async componentDidMount(){
    this.initReactGA();

    try {
      const collections = await API.get(`get_collections`);
      this.setState({collections: collections.data});

      const new_collections = await API.get(`get_upcoming_collections`);
      this.setState({upcoming_collections: new_collections.data});

      const floors = await API.get(`get_floors`);
      this.setState({floors: floors.data, floor_interval_id: setInterval(this.checkFloors, 300000)});

    } catch (err) {
      
    }
  }

  async checkFloors(){
    const floors = await API.get(`get_floors`);
    this.setState({floors: floors.data});
  }

  componentWillUnmount() {
    clearInterval(this.state.floor_interval_id);
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
              <RarityCollections key="general_rarity" collections={this.state.collections} floors={this.state.floors}/>
            </Route>

            <Route path="/c/">
              <RarityCollections key="shortlink_rarity" collections={this.state.collections} floors={this.state.floors}/>
            </Route>


            <Route path="/about">
              <About />
            </Route>
            
            <Route path="/bots">
              <Bots />
            </Route>

            <Route path="/upcoming">
              <UpcomingMints collections={this.state.upcoming_collections}/>
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
