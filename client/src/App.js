import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import socket from './utils/socket';
import Auctions from './containers/Auctions';
import Assets from './containers/Assets';
import Auction from './containers/Auction';
import AuctionForm from './containers/AuctionForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auctions">Auctions</Link>
            </li>
            <li>
              <Link to="/assets">Assets</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/auctions">
            <Auctions />
          </Route>
          <Route path="/auction/:id">
            <Auction />
          </Route>
          <Route path="/auction">
            <AuctionForm />
          </Route>
          <Route path="/assets">
            <Assets />
          </Route>
          <Route path="/">
            <Auctions />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function AuctionItem(props) {
  const [expanded, setExpanded] = useState(false);
  const { name } = props;

  return (
    <div>
      <div>
        <p>{name}</p>
        <button onClick={() => setExpanded(!expanded)}>Enter</button>
      </div>
      {expanded ? <Auction {...props} /> : null}
    </div>
  );
}

function Auction1({ id, lastBid }) {
  const [lastBidder, setLastBidder] = useState(lastBid);

  console.log({ lastBid });

  useEffect(() => {
    socket.on('auction:update', (data) => {
      if (data.id === id && data.user) {
        setLastBidder(data.user);
      }
    });

    return () => {
      socket.off('auction:update');
    };
  }, []);

  useEffect(() => {
    socket.emit('user:join', id);
    console.log('connected to auction');

    return () => {
      socket.emit('user:leave', id);
      console.log('disconnected from auction');
    };
  }, [id]);

  function placeBid() {
    socket.emit('bid:create', id);
  }

  return (
    <div>
      <p>Content for auction {id}</p>
      <p>Last bidder id: {lastBidder || 'none'}</p>
      <button onClick={placeBid}>Place bid</button>
    </div>
  );
}

export default App;
