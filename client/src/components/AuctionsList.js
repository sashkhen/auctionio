import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuctionItem from './AuctionItem';
import { auctionPropType } from '../propTypes';

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 16px;
  margin: 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

function AuctionsList({ auctions }) {
  return (
    <StyledList>
      {auctions.map((item) => (
        <AuctionItem key={item._id} auction={item} />
      ))}
    </StyledList>
  );
}

AuctionsList.propTypes = {
  auctions: PropTypes.arrayOf(auctionPropType),
};

export default AuctionsList;
