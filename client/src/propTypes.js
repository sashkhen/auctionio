import PropTypes from 'prop-types';
import { ASSET_TYPE_OPTIONS } from './consts';

export const assetPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  status: PropTypes.oneOf(['AVAILABLE', 'ACTIVE', 'SOLD']).isRequired,
  type: PropTypes.oneOf(ASSET_TYPE_OPTIONS.map((item) => item.value))
    .isRequired,
});

export const auctionPropType = PropTypes.shape({
  _id: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  name: PropTypes.string,
  assets: PropTypes.arrayOf(assetPropType),
  lastBid: PropTypes.shape({
    value: PropTypes.number,
    userId: PropTypes.string,
  }),
});
