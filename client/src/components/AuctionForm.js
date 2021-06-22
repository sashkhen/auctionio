import moment from 'moment';
import { useEffect } from 'react';
import Select from 'react-select';
import useForm from '../utils/useForm';

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

function AssetsSelect({ list, selected, onChange }) {
  const options = createOptions(list);
  const value = createOptions(selected);

  function handleChange(values) {
    const ids = values.map((item) => item.value);
    onChange({ target: { name: 'assets', value: ids } });
  }

  return (
    <Select
      isMulti
      name="assets"
      options={options}
      defaultValue={value}
      onChange={handleChange}
    />
  );
}

export default function AuctionForm({
  auction = {},
  assets = [],
  onSubmit,
  loading = false,
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
  }, [complete, error]);

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: inputs.name,
      assets: inputs.assets,
      start: composeDate(inputs.startDate, inputs.startTime),
      end: composeDate(inputs.endDate, inputs.endTime),
    };

    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{auction ? 'Update' : 'Create'} Auction</h2>
      <fieldset>
        <label htmlFor="name">Auction Name</label>
        <input
          type="text"
          name="name"
          placeholder="Auction Name"
          value={inputs.name || ''}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={inputs.startDate || ''}
          onChange={handleChange}
        />
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={inputs.startTime || ''}
          onChange={handleChange}
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          value={inputs.endDate || ''}
          onChange={handleChange}
        />
        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          name="endTime"
          value={inputs.endTime || ''}
          onChange={handleChange}
          required
        />
      </fieldset>
      <AssetsSelect
        list={assets || []}
        selected={inputs.assets || []}
        onChange={handleChange}
      />
      <input type="submit" value="Save" />
    </form>
  );
}
