import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBid = styled.div`
  display: grid;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;

  span {
    color: rgba(0, 0, 0, 1);

    &.bold {
      font-weight: 700;
    }
  }
`;

function AuctionBid({ value, userId, style }) {
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

AuctionBid.propTypes = {
  value: PropTypes.number,
  userId: PropTypes.string,
  style: PropTypes.object,
};

export default AuctionBid;
