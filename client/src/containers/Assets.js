import React, { useState, useEffect } from 'react';
import useEndpoint from '../utils/useEndpoint';

export default function Auctions() {
  const [assets, setAssets] = useState([]);
  const { data, loading, error } = useEndpoint({ url: '/assets' });

  useEffect(() => {
    if (data) {
      setAssets(data?.assets || []);
    }
  }, [data]);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Ooops... something went wrong';
  }

  if (!data) {
    return 'No assets found';
  }

  return (
    <div>
      <h2>Assets</h2>
      <ul>
        {assets.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
