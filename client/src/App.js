import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SocketContext, socket } from './utils/socket';
import Auctions from './containers/Auctions';
import Assets from './containers/Assets';
import Auction from './containers/Auction';
import Asset from './containers/Asset';
import AuctionForm from './containers/AuctionForm';
import AssetForm from './containers/AssetForm';
import EmptyState from './components/EmptyState';
import Page from './components/Page';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Page>
          <Switch>
            <Route path="/auctions" component={Auctions} />
            <Route path="/auction/:id" component={Auction} />
            <Route path="/auction" component={AuctionForm} />
            <Route path="/assets" component={Assets} />
            <Route path="/asset/:id" component={Asset} />
            <Route path="/asset" component={AssetForm} />
            <Route exact path="/" component={Auctions} />
            <Route path="*" component={EmptyState} />
          </Switch>
        </Page>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
