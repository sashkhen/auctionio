import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormField, TextInput } from 'evergreen-ui';
import StyledForm from './StyledForm';
import StyledSelect from './StyledSelect';
import Button from './Button';
import useForm from '../utils/useForm';
import { ASSET_TYPE_OPTIONS } from '../consts';

const options = ASSET_TYPE_OPTIONS;

function AssetForm({
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
      <FormField label="Asset Picture" labelFor="picture">
        <TextInput
          type="text"
          name="picture"
          placeholder="Paste link to the image here"
          value={inputs.picture || ''}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Asset Type" labelFor="type">
        <StyledSelect
          name="type"
          options={options}
          onChange={onSelect}
          placeholder="Select type"
        />
      </FormField>
      <Button type="submit" appearance="primary" onClick={handleSubmit}>
        Save
      </Button>
    </StyledForm>
  );
}

AssetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  complete: PropTypes.bool,
  error: PropTypes.bool,
};

export default AssetForm;
