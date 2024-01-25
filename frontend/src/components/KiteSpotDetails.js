import MyMap from "./MyMap";
import { useKiteSpotsContext } from "../hooks/useKiteSpotsContext";

const KiteSpotDetails = ({ kitespot }) => {
  const { dispatch } = useKiteSpotsContext();
  // delete a KiteSpot
  const handleClick = async () => {
    const response = await fetch("/api/kiteSpots/" + kitespot._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_KITESPOT", payload: json });
    }
  };

  return (
    <>
      <div className="kitespot-details">
        <MyMap
          kitespotlat={kitespot.location.lat}
          kitespotlng={kitespot.location.lng}
        />
        <h4>{kitespot.name}</h4>
        <p>
          <strong> {kitespot.address}</strong>
        </p>
        <p>{kitespot.description}</p>
        <p>Location</p>
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
        <span onClick={handleClick} className="delete-button">
          delete
        </span>
      </div>
    </>
  );
};

export default KiteSpotDetails;
