import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
  } from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      const collections = this.props.group;

      return (
        <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="bi me-2" src={require('../img/logo.png').default} width="40px" height="40px" />
                <span className="fs-5"><strong>SOL Tracker</strong></span>
            </a>
    
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink to="/" className="nav-link px-2 link-dark" activeClassName="link-secondary">Home</NavLink></li>
                <li><NavLink to="/rarity/" className="nav-link px-2 link-dark" activeClassName="link-secondary">Rarity</NavLink></li>
                <li><NavLink to="/about" className="nav-link px-2 link-dark" activeClassName="link-secondary">About</NavLink></li>
            </ul>
    
            <div className="col-md-3 text-end">
                <a href="https://twitter.com/sol_tracker" target="_blank">
                    <img src={require('../img/twitter.png').default} width="30px"/>
                </a>
            {/* <button type="button" class="btn btn-outline-primary me-2">Login</button>
                <button type="button" class="btn btn-primary">Sign-up</button> */}
            </div>
        </header>
        </div>
      );
    }
}


export default Header;
