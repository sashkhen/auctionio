import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner, Pane, toaster } from 'evergreen-ui';
import styled from 'styled-components';
import AssetsList from '../components/AssetsList';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import useEndpoint from '../utils/useEndpoint';

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

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const { data, loading, error } = useEndpoint({ url: '/assets' });
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setAssets(data?.assets || []);
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

    if (!data || !data.assets.length) {
      return <EmptyState message="Looks like there is no assets yet" />;
    }

    return <AssetsList assets={assets} withTitle={false} withStatus={true} />;
  };

  return (
    <Layout>
      <h2>Assets</h2>

      <Button
        type="button"
        onClick={() => history.push('/asset')}
        appearance="primary"
      >
        Create new
      </Button>

      <div>{getContent()}</div>
    </Layout>
  );
}
