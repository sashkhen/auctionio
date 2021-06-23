import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useEndpoint from '../utils/useEndpoint';
import Form from '../components/AssetForm';

export default function AssetForm({ onSuccess }) {
  const history = useHistory();
  const {
    data,
    loading,
    error,
    complete,
    dispatch: postAsset,
  } = useEndpoint(
    {
      method: 'POST',
      url: '/asset',
    },
    false,
  );

  useEffect(() => {
    if (complete && !error) {
      if (onSuccess) {
        return onSuccess(data);
      }

      // return history.push(`/asset/${data.asset._id}`);
      return history.push('/assets');
    }
  }, [complete, error, data, history, onSuccess]);

  function handleSubmit(payload) {
    postAsset(payload);
  }

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      complete={complete}
    />
  );
}
