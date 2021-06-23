import styled from 'styled-components';

const StyledBid = styled.div`
  display: grid;
  align-self: end;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;

  span {
    color: rgba(0, 0, 0, 1);

    &.bold {
      font-weight: 700;
    }
  }
`;

export default function AuctionBid({ value, userId, style }) {
  if (!value) {
    return <StyledBid />;
  }

  return (
    <StyledBid style={style}>
      <span>
        <span className="bold">${value}</span> by{' '}
      </span>
      <span>{userId}</span>
    </StyledBid>
  );
}
