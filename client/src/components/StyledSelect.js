import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: '#d8dae5',
    fontSize: 12,
  }),
  input: (provided) => ({
    ...provided,
    height: 32,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#d8dae5',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: 12,
  }),
};

export default function StyledSelect(props) {
  return <Select {...props} styles={customStyles} />;
}
