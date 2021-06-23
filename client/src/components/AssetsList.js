import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Badge } from 'evergreen-ui';
import { assetPropType } from '../propTypes';

const DEFAULT_IMAGE =
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a28bb586186241.5d9228d24780f.gif';

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 16px;
  margin: 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledItem = styled.li`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 100px 1fr;
  grid-template-areas:
    'image name'
    'image type';
  padding: 8px 8px;
  background-color: #f3f6ff;
  border-left: 2px solid #f3f6ff;
  transition: border-left-color 0.2s ease-out;

  &:hover {
    border-left-color: #2952cc;
  }
`;
const StyledName = styled.div`
  grid-area: name;
  align-self: end;

  font-weight: 700;
`;
const StyledType = styled.div`
  grid-area: type;
  align-self: start;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  opacity: 0.7;
  font-size: 14px;

  > * {
    margin-right: 4px;
  }
`;
const StyledPicture = styled.img`
  grid-area: image;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export function AssetItem({ asset, withStatus }) {
  return (
    <StyledItem key={asset._id}>
      <StyledPicture src={asset.picture || DEFAULT_IMAGE} />
      <StyledName>{asset.name}</StyledName>
      <StyledType>
        <span>{asset.type}</span>
        {withStatus && (
          <Badge color={asset.status === 'SOLD' ? 'red' : 'blue'}>
            {asset.status}
          </Badge>
        )}
      </StyledType>
    </StyledItem>
  );
}

function AssetsList({ assets = [], withTitle = true, withStatus = false }) {
  const title =
    !assets || !assets.length ? 'There are no assets yet...' : 'Assets';
  const titleTag = withTitle ? <h3>{title}</h3> : null;

  return (
    <div>
      {titleTag}
      <StyledList>
        {assets.map((item) => (
          <AssetItem asset={item} key={item._id} withStatus={withStatus} />
        ))}
      </StyledList>
    </div>
  );
}
AssetItem.propTypes = {
  asset: assetPropType.isRequired,
  withStatus: PropTypes.bool,
};

AssetsList.propTypes = {
  assets: PropTypes.arrayOf(assetPropType),
  withTitle: PropTypes.bool,
  withStatus: PropTypes.bool,
};

export default AssetsList;
