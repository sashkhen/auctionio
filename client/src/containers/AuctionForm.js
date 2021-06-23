import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner, Pane, toaster } from 'evergreen-ui';
import useEndpoint from '../utils/useEndpoint';
import Form from '../components/AuctionForm';

const StyledPane = styled(Pane)`
  display: flex;
  justify-content: center;
  height: 200px;
  align-items: center;
`;

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
  const assets = (assetsResp?.assets || []).filter(
    (item) => item.status !== 'SOLD',
  );

  useEffect(() => {
    if (auctionComplete && !auctionError) {
      if (onSuccess) {
        return onSuccess(auctionResp);
      }

      return history.push(`/auction/${auctionResp.auction._id}`);
    }

    if (assetsError) {
      toaster.danger('There were no assets found');
    }

    if (auctionError) {
      toaster.danger('Please check provided data and try again');
    }
  }, [
    auctionComplete,
    auctionError,
    auctionResp,
    assetsError,
    history,
    onSuccess,
  ]);

  function handleSubmit(payload) {
    postAuction(payload);
  }

  if (assetsLoading) {
    return (
      <StyledPane>
        <Spinner />
      </StyledPane>
    );
  }

  return (
    <Form
      auction={auction}
      assets={assets}
      onSubmit={handleSubmit}
      loading={auctionLoading}
      error={auctionError}
      complete={auctionComplete}
    />
  );
}
