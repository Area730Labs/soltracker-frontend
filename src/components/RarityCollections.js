import React from 'react';
import CollectionButton from './CollectionButton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import RarityCheck from './RarityCheck';
import ReactGA from 'react-ga';

class RarityCollections extends React.Component {

    constructor(props) {
        super(props);   

        this.state = {query: '', elems: null, initialElems: null};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        var query = e.target.value.trim().toLowerCase();
       
        this.updateSearchQuest(query);
    }

    static getDerivedStateFromProps(props, state) {
        const varList = props.collections;

        if (!varList){
            // console.log("reseting vars, got empty array");
            return {query: '', elems: null, initialElems: null};
        }

        if (!state.initialElems){
            // console.log("initing vars for the first time");
            return {elems: varList, initialElems: varList };
        }

        let difference = varList.filter(x => !state.initialElems.includes(x));
        let newInitialItems = RarityCollections.mergeIntoArray(state.initialElems, difference);
        let newElems = RarityCollections.mergeIntoArray(state.elems, difference);

        return {elems: newElems, initialElems: newInitialItems };
    }

    updateSearchQuest(query) {
        if (!this.state.initialElems){
            return;
        }

        var newState = {query: query, elems: []}

        if (query.length > 0){
            newState.elems = this.state.initialElems.filter(item => item.name.toLowerCase().includes(query))
        } else {
            newState.elems = this.state.initialElems;
        }

        this.setState(newState);
    }

    static mergeIntoArray(arr1, arr2){
        let merged = [];

        for(let i=0; i<arr1.length; i++) {
            merged.push({
                ...arr1[i], 
                ...(arr2.find((itmInner) => itmInner.name === arr1[i].name))}
            );
        }

        return merged;
    }


    async componentDidMount(){
        ReactGA.pageview('/rarity');
    }

    render() {
        const collections = this.props.collections;

      return (

        <Switch>

            <Route exact path="/rarity/">
                <div className="list-group list-group-checkable p-2 mt-4">

                    <div className="mb-2 card card-body p-2 d-flex">
                        <input type="text" className="form-control bg-light border-0" placeholder="Search" onChange={this.handleChange} value={this.state.query}   />
                    </div>

                    {this.state.elems && this.state.elems.map((collection, i) => {
                        return (
                            <CollectionButton name={collection.name} slug={collection.slug} id={collection.id} key={collection.slug} url={collection.icon_url} />
                        )
                    })}

                </div>
            </Route>

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/rarity/' + collection.slug}>
                        <RarityCheck key={collection.id}  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  />
                    </Route>
                )
            })}

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/c/' + collection.slug}>
                        <RarityCheck key={collection.id}  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  />
                    </Route>
                )
            })}

        </Switch>
      );
    }
}


export default RarityCollections;
