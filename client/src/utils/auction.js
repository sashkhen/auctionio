import moment from 'moment';
import { isInFuture } from '../utils';

export const isComplete = ({ start, end }) =>
  !isInFuture(start) && !isInFuture(end);
export const isActive = ({ start, end }) =>
  !isInFuture(start) && isInFuture(end);
export const isUpcoming = ({ start, end }) =>
  isInFuture(start) && isInFuture(end);

export const getStatus = (auction) => {
  switch (true) {
    case isActive(auction):
      return { value: 'ACTIVE', color: 'green' };
    case isComplete(auction):
      return { value: 'COMPLETE', color: 'red' };
    case isUpcoming(auction):
      return { value: 'UPCOMING', color: 'blue' };
    default:
      return { value: 'INACTIVE', color: 'neutral' };
  }
};

export const decorateDate = (date, key) =>
  moment(date).format(`[${key || ''}] hh:mm A, Do MMMM'YY`);

export const getHelpText = (status, { start, end }) => {
  switch (status) {
    case 'ACTIVE':
      return `ends ${moment(end).fromNow()}`;
    case 'UPCOMING':
      return `starts ${moment(start).fromNow()}`;
    case 'COMPLETE':
      return `ended ${moment(end).fromNow()}`;
    default:
      return moment(end).fromNow();
  }
};

// temp instead of filtering on server
export const getAuctionWithAssets = (auction) => {
  const assets = (auction.assets || []).filter((asset) => {
    return asset.status === 'AVAILABLE' || asset.activeAuction === auction._id;
  });
  return { ...auction, assets };
};
