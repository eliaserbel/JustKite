const KiteSpotDetails = ({ kitespot }) => {
  return (
    <div className="workout-details">
      <h4>{kitespot.name}</h4>
      <p>
        <strong> {kitespot.address}</strong>
      </p>
      <p>{kitespot.description}</p>
      <h3>Location</h3>
      <p>
        <strong>LAT: </strong>
        {kitespot.location.lat}
      </p>
      <p>
        <strong>LNG: </strong>
        {kitespot.location.lng}
      </p>
      <p>
        <strong>Windrate (m/s): </strong>
        {kitespot.condition}
      </p>
      <p>
        <strong>Level: </strong>
        {kitespot.level}
      </p>
      <p>
        <strong>Rating: </strong>
        {kitespot.rating}
      </p>
      <p>
        <strong>Creator: </strong>
        {kitespot.creator}
      </p>
      <p>
        <strong></strong>
      </p>
      <strong>Created at: </strong>
      <p>{kitespot.createdAt}</p>
    </div>
  );
};

export default KiteSpotDetails;
