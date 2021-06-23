import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner, Pane, toaster } from 'evergreen-ui';
import AssetForm from './AssetForm';
import { AssetItem } from '../components/AssetsList';
import EmptyState from '../components/EmptyState';
import useEndpoint from '../utils/useEndpoint';

const StyledContainer = styled.ul`
  margin-top: 24px;
`;

const StyledPane = styled(Pane)`
  display: flex;
  justify-content: center;
  height: 200px;
  align-items: center;
`;

export default function Asset() {
  const { id } = useParams();
  const [isEditMode, setEditMode] = useState(false);
  const [asset, setAsset] = useState({});
  const { data, loading, error } = useEndpoint({
    url: id ? `/asset/${id || ''}` : '',
  });

  useEffect(() => {
    if (data) {
      setAsset(data?.asset || {});
    }

    if (error) {
      toaster.danger('Ooops... something went wrong');
    }
  }, [data, error]);

  function handleSuccess(data) {
    setEditMode(false);
    setAsset(data.asset);
  }

  if (loading) {
    return (
      <StyledPane>
        <Spinner />
      </StyledPane>
    );
  }

  if (!data || !data.asset) {
    return <EmptyState message="There is no such auction" />;
  }

  return (
    <div>
      {isEditMode ? (
        <AssetForm onSuccess={handleSuccess} />
      ) : (
        <StyledContainer>
          <AssetItem asset={asset} />
        </StyledContainer>
      )}
    </div>
  );
}
