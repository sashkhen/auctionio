import styled from 'styled-components';
import Header from '../containers/Header';

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const StyledContent = styled.div`
  padding: 0 24px 24px;
  overflow: auto;
  background-color: #fafbff;
`;

export default function Page({ children }) {
  return (
    <StyledPage>
      <Header />
      <StyledContent>{children}</StyledContent>
    </StyledPage>
  );
}
