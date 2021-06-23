import { Badge } from 'evergreen-ui';
import styled from 'styled-components';
import { StyledDates, StyledDate } from './AuctionStyles';
import AuctionBid from './AuctionBid';
import { getStatus, decorateDate, getHelpText } from '../utils/auction';

const StyledView = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin: 8px 0;
  }
`;

export default function AuctionView({ auction, isActive }) {
  const status = getStatus(auction);
  const start = decorateDate(auction.start, 'starts at ');
  const end = decorateDate(auction.end, 'ends at ');
  const helpText = getHelpText(status.value, auction);

  return (
    <StyledView>
      <h2>{auction.name}</h2>
      <div>
        <Badge color={status.color}>{status.value}</Badge>
        <StyledDate style={{ marginLeft: '2px' }}>{helpText}</StyledDate>
      </div>
      <AuctionBid {...auction.lastBid} />

      <StyledDates>
        <StyledDate>{start}</StyledDate>
        <StyledDate>{end}</StyledDate>
      </StyledDates>
    </StyledView>
  );
}
