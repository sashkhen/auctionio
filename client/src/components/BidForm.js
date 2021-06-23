import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledForm from './StyledForm';
import Button from './Button';

const DEFAULT_STEP = 5;

const VerticalForm = styled(StyledForm)`
  grid-auto-flow: column;
  align-items: center;
  margin: 8px 0;
`;

function BidForm({
  defaultValue = 0,
  onSubmit,
  loading = false,
  disabled = false,
}) {
  const [value, setValue] = useState(defaultValue + DEFAULT_STEP);
  const [minValue, setMinValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue + DEFAULT_STEP);
    setMinValue(defaultValue + DEFAULT_STEP);
  }, [defaultValue]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ value });
  }

  return (
    <VerticalForm>
      <input
        type="number"
        name="value"
        placeholder="100"
        value={value || 0}
        min={minValue}
        step={DEFAULT_STEP}
        style={{ height: '28px' }}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled || loading}
      />
      <Button
        type="submit"
        appearance="primary"
        onClick={handleSubmit}
        disabled={disabled || loading}
      >
        Bid
      </Button>
    </VerticalForm>
  );
}

BidForm.propTypes = {
  defaultValue: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default BidForm;
