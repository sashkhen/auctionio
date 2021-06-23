import styled from 'styled-components';

const StyledBox = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;
  min-height: 200px;
  text-align: center;

  > * {
    max-width: 300px;
  }
`;

export default function EmptyState({ message }) {
  return (
    <StyledBox>
      <div>
        <h3>Oooops... something went wrong</h3>
        <p>{message || ''}</p>
      </div>
    </StyledBox>
  );
}
