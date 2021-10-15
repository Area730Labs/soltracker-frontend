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

      const collections = [
        {'id': 757, 'name': 'Skyline', 'count': 1555, 'slug': 'skyline', 'icon_url': 'https://pbs.twimg.com/profile_images/1445195706789203970/BnpYWNU-_400x400.jpg', 'website': 'https://skylinenft.art', 'twitter': 'skylineNFT', 'discord': 'https://discord.gg/KDCM2XCUBr'},
        {'id': 755, 'name': 'Sol Yetis', 'count': 8888, 'slug': 'solyetis', 'icon_url': 'https://pbs.twimg.com/profile_images/1442221544223219714/RnqT9oPb_400x400.jpg', 'website': 'https://solyetis.io', 'twitter': 'SolYetis', 'discord': 'https://discord.gg/dxZvHtWpbb'},
        {'id': 756, 'name': 'Pesky Penguins', 'count': 8888, 'slug': 'peskypenguins', 'icon_url': 'https://pbs.twimg.com/profile_images/1446453038336593920/czWhhBp5_400x400.jpg', 'website': 'https://peskypenguinclub.com', 'twitter': 'PeskyPenguinNFT', 'discord': 'https://discord.gg/akwKnaKzRy'},
        {'id': 753, 'name': 'Happy Pups', 'count': 5000, 'slug': 'happypups', 'icon_url': 'https://pbs.twimg.com/profile_images/1441094530661376007/ojN0OYrA_400x400.jpg', 'website': 'https://www.happypups.io', 'twitter': 'HappyPupsNFT', 'discord': 'https://discord.gg/R9XCYPkysA'},
      ]

      return (

        <Switch>

            <Route exact path="/rarity/">
                <div className="list-group list-group-checkable">
                    {collections.map((collection, i) => {
                        return (
                            <CollectionButton name={collection.name} slug={collection.slug} id={collection.id} key={collection.slug} />
                        )
                    })}
                </div>
            </Route>

            {collections.map((collection, i) => {
                return (
                    <Route exact path={'/rarity/' + collection.slug}>
                        <RarityCheck collection_id={collection.id} collection_name={collection.name} collection_slug={collection.slug} total_count={collection.count} icon_url={collection.icon_url} website={collection.website} twitter={collection.twitter} discord={collection.discord}  />
                    </Route>
                )
            })}

        </Switch>
      );
    }
}


export default RarityCollections;
