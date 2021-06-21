import React, { useState, useEffect } from "react";
import socket from './utils/socket';

const INITIAL_STATE = {
  loading: false,
  // error: false,
};

function App() {
  const [auctions, setAuctions] = useState([]);
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    socket.connect();
    setState({
      ...INITIAL_STATE,
      loading: true,
    });

    socket.on('API:auction:all', (data) => {
      setAuctions(data);
      setState({...INITIAL_STATE});
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (!auctions) {
    return <p>Ooops... there are no auctions yet</p>;
  }

  return <div>
    {auctions.map((auction, i) => {
      return <AuctionItem {...auction} key={auction.id} />;
    })}
  </div>;
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
  )
}

function Auction({ id, lastBid }) {
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

  return <div>
    <p>Content for auction {id}</p>
    <p>Last bidder id: {lastBidder || 'none'}</p>
    <button onClick={placeBid}>Place bid</button>
  </div>;
}

export default App;
