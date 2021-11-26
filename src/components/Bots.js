import React from 'react';
import TweetEmbed from 'react-tweet-embed';

class Bots extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      const collections = this.props.group;

      return (
        <main className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="pb-2 mb-0 h4">Bots</h6>
                <div className="text-muted pt-3 text-black">
                    <div className="pb-3 mb-0 lh-sm h6 mt-3 pb-4 text-black">
                        We provide essential bots for our clients (and for the best price you can find!). Contact us on <a href="https://twitter.com/sol_tracker" target="_blank">Twitter</a> for details. 
                        <br/><br/>
                        Every NFT collection needs a few essential bots that greatly benefit the collection and its community.
                    </div>

                    <div className="pb-3 mb-0 lh-sm h6 mt-3 pb-4 text-black">
                        <strong>Sales Bot</strong> -  our sales bot monitors <strong>ALL</strong> marketplaces for new sales of your collection. When a sale happens - the bot creates a Twitter or Discord post about the item that hat beed just sold. This post includes price, market, id of nft being sold, and, of course, its image. It looks like this:
                    </div>

                    <TweetEmbed id="1444003267667759143" options={{align: 'center', width: 350 }}/>

                    <div className="pb-3 mb-0 lh-sm h6 mt-3 pb-4 text-black">
                        In Discord it looks like this:
                    </div>

                    <center><img className="rounded" src={require('../img/bots/discord_message_example.png').default} width="350px"/></center>
                    
                    <div className="pb-3 mb-0 lh-sm h6 mt-3 pb-4 text-black">
                        <strong>Listing Bot</strong> -  similar to Sales bots, but notifies the community about new NFT listings. 
                    </div>

                    <div className="pb-3 mb-0 lh-sm h6 mt-3 pb-4 text-black">
                        <strong>Rarity Bot (free!)</strong> - allows users to check the rarity of any NFT from their collection right in the Discord. 
                    </div>


                </div>

            </div>
        </main>
      );
    }
}

export default Bots;
