import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner, Pane, toaster } from 'evergreen-ui';
import AuctionForm from './AuctionForm';
import BidForm from './BidForm';
import AuctionView from '../components/AuctionView';
import AssetsList from '../components/AssetsList';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import useEndpoint from '../utils/useEndpoint';
import { SocketContext } from '../utils/socket';
import { getStatus, getAuctionWithAssets } from '../utils/auction';

const StyledControls = styled.div`
  display: inline-grid;
  grid-gap: 16px;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  margin: 8px 0;
`;

const StyledPane = styled(Pane)`
  display: flex;
  justify-content: center;
  height: 200px;
  align-items: center;
`;

const checkActive = (auction) => getStatus(auction).value === 'ACTIVE';
const checkEditable = (auction) =>
  ['ACTIVE', 'COMPLETE'].indexOf(getStatus(auction).value) === -1;

export default function Auction() {
  const history = useHistory();
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [isEditMode, setEditMode] = useState(false);
  const [isActive, setActive] = useState(false);
  const [auction, setAuction] = useState({});
  const { data, loading, error } = useEndpoint({
    url: id ? `/auction/${id || ''}` : '',
  });
  const {
    data: deletePayload,
    loading: deleteLoading,
    error: deleteError,
    dispatch: deleteAuction,
  } = useEndpoint(
    {
      url: id ? `/auction/${id || ''}` : '',
      method: 'DELETE',
    },
    false,
  );

  useEffect(() => {
    if (data) {
      const auctionData = getAuctionWithAssets(data?.auction || {});

      setAuction(auctionData);
      setActive(checkActive(auctionData));
    }

    if (error) {
      toaster.danger('Ooops... something went wrong');
    }

    if (deleteError) {
      toaster.danger('Cannot delete auction');
    }

    if (deletePayload) {
      return history.push('/auctions');
    }
  }, [data, error, deletePayload, deleteError, history]);

  useEffect(() => {
    const onUpdate = (data) => {
      if (data.auction._id !== id) return;

      if (data.event === 'start') {
        return setActive(true);
      }

      if (data.event === 'end') {
        return setActive(false);
      }
    };

    socket.emit('user:join', id);
    socket.on('auction:update', onUpdate);

    return () => {
      socket.emit('user:leave', id);
      socket.off('auction:update', onUpdate);
    };
  }, [socket, id]);

  function updateAuction(bidData) {
    setAuction((saved) => ({ ...saved, lastBid: bidData }));
  }

  function handleSuccess(data) {
    setEditMode(false);
    setAuction(data.auction);
  }

  if (loading) {
    return (
      <StyledPane>
        <Spinner />
      </StyledPane>
    );
  }

  if (!data || !data.auction) {
    return <EmptyState message="Looks like there is no such auction" />;
  }

  return (
    <div>
      {isEditMode ? (
        <AuctionForm auction={auction} onSuccess={handleSuccess} />
      ) : (
        <>
          <AuctionView auction={auction} isActive={isActive} />
          <div>
            <BidForm
              id={id}
              lastBidValue={auction?.lastBid?.value}
              onSuccess={updateAuction}
              disabled={!isActive || !auction?.assets?.length}
            />
          </div>
          <StyledControls>
            <Button
              onClick={() => setEditMode(true)}
              disabled={!checkEditable(auction)}
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteAuction()}
              disabled={isActive || deleteLoading}
              appearance="primary"
              intent="danger"
            >
              Delete
            </Button>
          </StyledControls>
          <AssetsList assets={auction?.assets} />
        </>
      )}
    </div>
  );
}
