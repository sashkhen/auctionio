import { Link } from 'react-router-dom';
import { Badge } from 'evergreen-ui';
import styled from 'styled-components';
import {
  StyledName,
  StyledAssets,
  StyledTitle,
  StyledState,
  StyledDates,
  StyledDate,
} from './AuctionStyles';
import AuctionBid from './AuctionBid';
import { getStatus, decorateDate, getHelpText } from '../utils/auction';

const StyledItem = styled.li`
  padding: 8px 16px;
  background-color: #f3f6ff;
  border-left: 2px solid #f3f6ff;
  transition: border-left-color 0.2s ease-out;

  &:hover {
    border-left-color: #2952cc;
  }

  &.active {
    background-color: #f5fbf8;
    border-left-color: #f5fbf8;

    &:hover {
      border-left-color: #317159;
    }
  }

  &.complete {
    background-color: #fdf4f4;
    border-left-color: #fdf4f4;

    &:hover {
      border-left-color: #a73636;
    }
  }
`;

const StyledContent = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr auto;
`;

export default function AuctionsList({ auction }) {
  const status = getStatus(auction);
  const start = decorateDate(auction.start, 'starts at ');
  const end = decorateDate(auction.end, 'ends at ');
  const assets = ` (${auction.assets.length} asset${
    auction.assets.length === 1 ? '' : 's'
  })`;
  const helpText = getHelpText(status.value, auction);

  return (
    <StyledItem key={auction._id} className={status.value.toLowerCase()}>
      <Link to={`/auction/${auction._id}`}>
        <StyledContent>
          <StyledTitle>
            <StyledName>{auction.name}</StyledName>
            <StyledAssets>{assets}</StyledAssets>
            <StyledDates>
              <StyledDate>{start}</StyledDate>
              <StyledDate>{end}</StyledDate>
            </StyledDates>
          </StyledTitle>
          <StyledState>
            <Badge color={status.color}>{status.value}</Badge>
            <StyledDate>{helpText}</StyledDate>
            <AuctionBid {...auction.lastBid} style={{ textAlign: 'right' }} />
          </StyledState>
        </StyledContent>
      </Link>
    </StyledItem>
  );
}
