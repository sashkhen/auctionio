import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner, Pane, toaster } from 'evergreen-ui';
import styled from 'styled-components';

import AuctionsList from '../components/AuctionsList';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import useEndpoint from '../utils/useEndpoint';
import { getAuctionWithAssets } from '../utils/auction';

const Layout = styled.div`
  padding: 24px 0;
  min-height: calc(100% - 24px * 2);
  box-sizing: border-box;
`;

const StyledPane = styled(Pane)`
  display: flex;
  justify-content: center;
  height: 200px;
  align-items: center;
`;

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const { data, loading, error } = useEndpoint({ url: '/auctions' });
  const history = useHistory();

  useEffect(() => {
    if (data) {
      const auctionsData = (data?.auctions || []).map(getAuctionWithAssets);
      setAuctions(auctionsData);
    }

    if (error) {
      toaster.danger('Ooops... something went wrong');
    }
  }, [data, error]);

  const getContent = () => {
    if (loading) {
      return (
        <StyledPane>
          <Spinner />
        </StyledPane>
      );
    }

    if (!data || !data.auctions.length) {
      return <EmptyState message="Looks like there is no auctions yet" />;
    }

    return <AuctionsList auctions={auctions} />;
  };

  return (
    <Layout>
      <h2>Auctions</h2>

      <Button
        type="button"
        onClick={() => history.push('/auction')}
        appearance="primary"
      >
        Create new
      </Button>

      <div>{getContent()}</div>
    </Layout>
  );
}
