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
        {'id': 760, 'name': 'BabyApes', 'count': 5000, 'slug': 'babyapes', 'icon_url': 'https://pbs.twimg.com/profile_images/1447493494839255042/sj4tyCEy_400x400.jpg', 'website': 'https://babyapes.io', 'twitter': 'BabyApesNFT', 'discord': 'https://discord.gg/65zeFekP2q',
            'markets':[
                {'name': 'Alpha',       'url': 'https://alpha.art/collection/babyapes'},
                {'name': 'Solanart',    'url': 'https://solanart.io/collections/babyapes'},
                {'name': 'MagicEden',   'url': 'https://www.magiceden.io/marketplace/babyapes'},
            ]
        },
        
        
        {'id': 757, 'name': 'Skyline', 'count': 5317, 'slug': 'skyline', 'icon_url': 'https://pbs.twimg.com/profile_images/1445195706789203970/BnpYWNU-_400x400.jpg', 'website': 'https://skylinenft.art', 'twitter': 'skylineNFT', 'discord': 'https://discord.gg/KDCM2XCUBr',
            'markets':[
                {'name': 'Alpha',       'url': 'https://alpha.art/collection/skyline'},
                {'name': 'Solanart',    'url': 'https://solanart.io/collections/skyline'},
                {'name': 'MagicEden',   'url': 'https://www.magiceden.io/marketplace/skyline_nft'},
            ]
        },

        {'id': 755, 'name': 'Sol Yetis', 'count': 8888, 'slug': 'solyetis', 'icon_url': 'https://pbs.twimg.com/profile_images/1442221544223219714/RnqT9oPb_400x400.jpg', 'website': 'https://solyetis.io', 'twitter': 'SolYetis', 'discord': 'https://discord.gg/dxZvHtWpbb',
            'markets':[
                {'name': 'Solanart',    'url': 'https://solanart.io/collections/solyetisog'},
            ]
        },

        {'id': 756, 'name': 'Pesky Penguins', 'count': 8888, 'slug': 'peskypenguins', 'icon_url': 'https://pbs.twimg.com/profile_images/1446453038336593920/czWhhBp5_400x400.jpg', 'website': 'https://peskypenguinclub.com', 'twitter': 'PeskyPenguinNFT', 'discord': 'https://discord.gg/akwKnaKzRy',
            'markets':[
                {'name': 'Alpha',       'url': 'https://alpha.art/collection/pesky-penguins'},
                {'name': 'MagicEden',   'url': 'https://www.magiceden.io/marketplace/pesky_penguins'},
                {'name': 'DigitalEyes', 'url': 'https://digitaleyes.market/collections/Pesky%20Penguins'},
                {'name': 'FTX',         'url': 'https://ftx.us/nfts/collection/Pesky%20Penguins/25/1'},
            ]
        },

        {'id': 753, 'name': 'Happy Pups', 'count': 5000, 'slug': 'happypups', 'icon_url': 'https://pbs.twimg.com/profile_images/1441094530661376007/ojN0OYrA_400x400.jpg', 'website': 'https://www.happypups.io', 'twitter': 'HappyPupsNFT', 'discord': 'https://discord.gg/R9XCYPkysA',
            'markets':[
                {'name': 'MagicEden',   'url': 'https://www.magiceden.io/marketplace/happy_pups'},
            ]
        },

        {'id': 758, 'name': 'SEALZ', 'count': 3333, 'slug': 'sealz', 'icon_url': 'https://pbs.twimg.com/profile_images/1443767838599168006/u6n1AwwU_400x400.jpg', 'website': 'https://sealz.co', 'twitter': 'SEALZDAO', 'discord': 'https://discord.gg/ygb6fsP5vs',
            'markets':[
                {'name': 'Alpha',       'url': 'https://alpha.art/collection/sealz'},
                {'name': 'MagicEden',   'url': 'https://www.magiceden.io/marketplace/sealz'},
            ]
        },
        
    ]

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
