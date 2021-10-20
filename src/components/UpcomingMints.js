import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import ReactGA from 'react-ga';

class UpcomingMints extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount(){
        ReactGA.pageview('/upcomint-mints/');
    }

    render() {

      return (
        <div className="list-group list-group-checkable p-2 text-center h5">
            We are filling up our upcoming mint calendar 💻<br/><br/>
            <span>👉 <a href="https://twitter.com/sol_tracker" target="_blank">Follow us</a> 👈</span> to be the first one to know!
        </div>
       
      );
    }
}


export default UpcomingMints;
