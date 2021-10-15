import React from 'react';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';



class CollectionButton extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.history.push({
            pathname: '/rarity/' + this.props.slug
        });
    }


    render() {
      const name = this.props.name;
      const slug = this.props.slug;

      return (
        <div onClick={this.handleClick}  >
            <input className="list-group-item-check" type="radio"  value=""  />
            <label className="list-group-item py-3 d-flex" htmlFor ="listGroupCheckableRadios1">
                {/* <img className="rounded-circle mr-3" src="https://pbs.twimg.com/profile_images/1445195706789203970/BnpYWNU-_400x400.jpg" width="50px" height="50px"/> */}
                {name}
                {/* <div className="d-block align-middle m-2">Skylines</div> */}
            </label>
        </div>
      );
    }
}


export default withRouter(CollectionButton);
