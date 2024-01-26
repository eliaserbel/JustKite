import MyMap from "./MyMap";
import { useKiteSpotsContext } from "../hooks/useKiteSpotsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const KiteSpotDetails = ({ kitespot }) => {
  const { dispatch } = useKiteSpotsContext();

  // delete a KiteSpot
  const handleClick = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/kiteSpots` + kitespot._id,
      {
        method: "DELETE",
      }
    );
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
          <strong className="kitespotaddress"> {kitespot.address}</strong>
        </p>
        <p>{kitespot.description}</p>
        <br></br>
        <p>
          <strong className="kitespotlocation">Location:</strong>
        </p>
        <p>LAT:{kitespot.location.lat}</p>
        <p>LNG:{kitespot.location.lng}</p>
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
        <br></br>
        <p>
          <strong></strong>
        </p>
        <strong>Created at: </strong>
        <p>
          {formatDistanceToNow(new Date(kitespot.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </>
  );
};

export default KiteSpotDetails;
