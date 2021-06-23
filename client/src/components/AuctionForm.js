import moment from 'moment';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormField, TextInput, toaster } from 'evergreen-ui';
import StyledForm from './StyledForm';
import StyledSelect from './StyledSelect';
import Button from './Button';
import useForm from '../utils/useForm';
import { isInFuture } from '../utils';
import { auctionPropType, assetPropType } from '../propTypes';

function composeDate(date, time) {
  return moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm:ss').toISOString();
}

function createOptions(list) {
  return list.map((item) => ({
    value: item._id,
    label: item.name,
  }));
}

function parseDate(dateTime) {
  if (!dateTime) {
    return {
      date: null,
      time: null,
    };
  }

  return {
    date: moment(dateTime).format('YYYY-MM-DD'),
    time: moment(dateTime).format('hh:mm:ss'),
  };
}

function validate(data) {
  const isEmpty = Object.keys(data).some((key) =>
    Array.isArray(data[key]) ? !data[key] || !data[key].length : !data[key],
  );
  const hasDatesInPast = [data.start, data.end].some(
    (date) => !isInFuture(date),
  );
  const hasIncorrectDate = !isInFuture(data.end, data.start);
  const errors = [
    isEmpty && 'All fields are required',
    hasDatesInPast && 'All dates must be in future',
    hasIncorrectDate && 'End date must be after start date',
  ].filter(Boolean);

  if (errors) {
    return { errors, valid: false };
  }

  return { valid: true };
}

function AssetsSelect({ list, selected, onChange }) {
  const options = createOptions(list);
  const value = createOptions(selected);

  function handleChange(values) {
    const ids = values.map((item) => item.value);
    onChange({ target: { name: 'assets', value: ids } });
  }

  return (
    <StyledSelect
      isMulti
      name="assets"
      placeholder="Select assets"
      options={options}
      defaultValue={value}
      onChange={handleChange}
    />
  );
}

function AuctionForm({
  auction = null,
  assets = [],
  onSubmit,
  complete = false,
  error = false,
}) {
  const start = parseDate(auction?.start);
  const end = parseDate(auction?.end);
  const { inputs, handleChange, clearForm } = useForm({
    ...auction,
    startDate: start.date,
    startTime: start.time,
    endDate: end.date,
    endTime: end.time,
  });

  useEffect(() => {
    if (complete && !error) {
      clearForm();
    }
  }, [complete, error, clearForm]);

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: inputs.name,
      assets: inputs.assets,
      start: composeDate(inputs.startDate, inputs.startTime),
      end: composeDate(inputs.endDate, inputs.endTime),
    };
    const validation = validate(payload);

    if (validation.errors && validation.errors.length) {
      toaster.danger(validation.errors.join(', '));
      return;
    }

    onSubmit(payload);
  }

  return (
    <StyledForm>
      <h2>{auction ? 'Update' : 'Create'} Auction</h2>
      <FormField label="Auction Name" labelFor="name" isRequired>
        <TextInput
          type="text"
          name="name"
          placeholder="Auction Name"
          value={inputs.name || ''}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Auction Assets" labelFor="assets" isRequired>
        <AssetsSelect
          list={assets || []}
          selected={inputs.assets || []}
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Start Date" labelFor="startDate" isRequired>
        <input
          type="date"
          name="startDate"
          value={inputs.startDate || ''}
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Start Time" labelFor="startTime" isRequired>
        <input
          type="time"
          name="startTime"
          value={inputs.startTime || ''}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField label="End Date" labelFor="endDate" isRequired>
        <input
          type="date"
          name="endDate"
          value={inputs.endDate || ''}
          onChange={handleChange}
        />
      </FormField>

      <FormField label="End Time" labelFor="endTime" isRequired>
        <input
          type="time"
          name="endTime"
          value={inputs.endTime || ''}
          onChange={handleChange}
          required
        />
      </FormField>
      <Button type="submit" appearance="primary" onClick={handleSubmit}>
        Save
      </Button>
    </StyledForm>
  );
}

AssetsSelect.propTypes = {
  list: PropTypes.arrayOf(assetPropType),
  selected: PropTypes.arrayOf(PropTypes.string), // asset._id
  onChange: PropTypes.func.isRequired,
};

AuctionForm.propTypes = {
  auction: auctionPropType,
  assets: PropTypes.arrayOf(assetPropType),
  onSubmit: PropTypes.func.isRequired,
  complete: PropTypes.bool,
  error: PropTypes.bool,
};

export default AuctionForm;
