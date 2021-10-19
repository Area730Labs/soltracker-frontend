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
    }

    async componentDidMount(){
        ReactGA.pageview('/rarity');
    }

    render() {
        const collections = this.props.collections;

      return (

        <Switch>

            <Route exact path="/rarity/">
                <div className="list-group list-group-checkable p-2">
                    {collections.map((collection, i) => {
                        return (
                            <CollectionButton name={collection.name} slug={collection.slug} id={collection.id} key={collection.slug} url={collection.icon_url} />
                        )
                    })}
                </div>
            </Route>

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/rarity/' + collection.slug}>
                        <RarityCheck  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  />
                    </Route>
                )
            })}

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/c/' + collection.slug}>
                        <RarityCheck  collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord} markets={collection.markets}  />
                    </Route>
                )
            })}

        </Switch>
      );
    }
}


export default RarityCollections;
