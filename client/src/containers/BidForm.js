import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { toaster } from 'evergreen-ui';

import Form from '../components/BidForm';
import { SocketContext } from '../utils/socket';

function BidForm({ id, lastBidValue = 0, onSuccess, disabled = false }) {
  const socket = useContext(SocketContext);
  const [state, setState] = useState({
    loading: false,
    error: false,
  });
  const [value, setValue] = useState(lastBidValue);

  useEffect(() => {
    setValue(lastBidValue);
  }, [lastBidValue]);

  useEffect(() => {
    const onUpdate = (data) => {
      if (data.auction._id !== id) return;

      if (data.event === 'bid') {
        setState((prev) => ({ ...prev, loading: false }));
        onSuccess(data.auction.lastBid);
        return;
      }

      if (data.event === 'error') {
        setState((prev) => ({ ...prev, loading: false }));
        toaster.danger('Ooops... something went wrong');
        return;
      }
    };

    socket.on('auction:update', onUpdate);

    return () => {
      socket.off('auction:update', onUpdate);
    };
  }, [socket, id, onSuccess]);

  function placeBid({ value }) {
    setState((prev) => ({ ...prev, loading: true }));
    socket.emit('bid:create', {
      id,
      bid: value,
    });
  }

  return (
    <Form
      {...state}
      onSubmit={placeBid}
      defaultValue={value}
      loading={state.loading}
      disabled={disabled}
    />
  );
}

BidForm.propTypes = {
  id: PropTypes.string.isRequired,
  lastBidValue: PropTypes.number,
  onSuccess: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default BidForm;
