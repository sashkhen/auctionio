import { useEffect } from 'react';
import Select from 'react-select';
import { FormField, TextInput } from 'evergreen-ui';
import StyledForm from './StyledForm';
import Button from './Button';
import useForm from '../utils/useForm';
import { ASSET_TYPE_OPTIONS } from '../variables';

const options = ASSET_TYPE_OPTIONS;

export default function AssetForm({
  onSubmit,
  loading = false,
  complete = false,
  error = false,
}) {
  const { inputs, handleChange, clearForm } = useForm({});

  useEffect(() => {
    if (complete && !error) {
      clearForm();
    }
  }, [complete, error, clearForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputs);
  }

  function onSelect({ value }) {
    handleChange({ target: { name: 'type', value } });
  }

  return (
    <StyledForm>
      <h2>Create Asset</h2>
      <FormField label="Asset Name" labelFor="name" isRequired>
        <TextInput
          type="text"
          name="name"
          placeholder="Asset Name"
          value={inputs.name || ''}
          onChange={handleChange}
        />
      </FormField>
      <Select name="type" options={options} onChange={onSelect} />
      <Button type="submit" appearance="primary" onClick={handleSubmit}>
        Save
      </Button>
    </StyledForm>
  );
}
