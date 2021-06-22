import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useEndpoint from '../utils/useEndpoint';
import AuctionForm from './AuctionForm';
import AuctionView from '../components/AuctionView';

export default function Auction() {
  const { id } = useParams();
  const [isEditMode, setEditMode] = useState(false);
  const [auction, setAuction] = useState([]);
  const { data, loading, error } = useEndpoint({
    url: id ? `/auction/${id || ''}` : '',
  });

  useEffect(() => {
    if (data) {
      setAuction(data?.auction || {});
    }
  }, [data]);

  function handleSuccess(data) {
    setEditMode(false);
    setAuction(data.auction);
  }

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return 'Ooops... something went wrong';
  }

  if (!data) {
    return 'There is no such auction';
  }

  return (
    <div>
      {isEditMode ? (
        <AuctionForm auction={auction} onSuccess={handleSuccess} />
      ) : (
        <>
          <AuctionView auction={auction} />
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
