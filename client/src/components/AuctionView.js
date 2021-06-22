export default function AuctionView({ auction }) {
  return (
    <div>
      <h2>Auction</h2>

      <p>Name: {auction.name}</p>
      <p>Starts at: {auction.start}</p>
      <p>Ends at: {auction.end}</p>

      <ul>
        Assets: {(!auction.assets || !auction.assets.length) && 'none'}
        {(auction?.assets || []).map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
