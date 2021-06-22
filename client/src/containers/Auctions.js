import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useEndpoint from '../utils/useEndpoint';

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const { data, loading, error } = useEndpoint({ url: '/auctions' });
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setAuctions(data?.auctions || []);
    }
  }, [data]);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Ooops... something went wrong';
  }

  if (!data) {
    return 'No auctions found';
  }

  return (
    <div>
      <h2>Auctions</h2>
      <ul>
        {auctions.map((item) => (
          <li key={item._id}>
            <Link to={`/auction/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => history.push('/auction')}>
        Create new
      </button>
    </div>
  );
}
