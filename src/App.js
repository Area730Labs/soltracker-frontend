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



import RarityCheck from './components/RarityCheck';

class App extends React.Component {
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
            <Redirect exact from="/" to="/rarity/solyetis" />

            <Route exact path="/rarity/solyetis" component={RarityCheck} />

            <Route path="/about">
              <About />
            </Route>

          </Switch>


      </Router>
    );
  }

}

export default App;
