import styled from 'styled-components';

const StyledForm = styled.form`
  display: inline-grid;
  grid-gap: 16px;
  margin-bottom: 36px;

  input {
    padding-left: 12px;
    padding-right: 12px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #d8dae5;
    font-size: 12px;
    font-family: inherit;
    color: inherit;

    &::placeholder {
      opacity: 0.5;
    }
  }

  [type='submit'] {
    justify-self: start;
  }
`;

export default StyledForm;
