import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useEndpoint from '../utils/useEndpoint';
import Form from '../components/AuctionForm';

export default function AuctionForm({ auction, onSuccess }) {
  const history = useHistory();
  const {
    data: assetsResp,
    loading: assetsLoading,
    error: assetsError,
  } = useEndpoint({
    url: '/assets',
  });
  const {
    data: auctionResp,
    loading: auctionLoading,
    error: auctionError,
    complete: auctionComplete,
    dispatch: postAuction,
  } = useEndpoint(
    {
      method: 'POST',
      url: `/auction/${auction?._id || ''}`,
    },
    false,
  );

  useEffect(() => {
    if (auctionComplete && !auctionError) {
      if (onSuccess) {
        return onSuccess(auctionResp);
      }

      return history.push(`/auction/${auctionResp.auction._id}`);
    }
  }, [auctionComplete, auctionError, auctionResp]);

  function handleSubmit(payload) {
    postAuction(payload);
  }

  if (assetsLoading) {
    return 'Loading...';
  }

  if (assetsError) {
    return 'Assets not found';
  }

  return (
    <Form
      auction={auction}
      assets={assetsResp.assets}
      onSubmit={handleSubmit}
      loading={auctionLoading}
      error={auctionError}
      complete={auctionComplete}
    />
  );
}
