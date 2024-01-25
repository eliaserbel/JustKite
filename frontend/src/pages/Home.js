import { useEffect } from "react";
import { useKiteSpotsContext } from "../hooks/useKiteSpotsContext";

// components
import KiteSpotDetails from "../components/KiteSpotDetails";
import MyLocation from "../components/MyLocation";

const Home = () => {
  const { kitespots, dispatch } = useKiteSpotsContext();

  useEffect(() => {
    const fetchKiteSpots = async () => {
      const response = await fetch("/api/kiteSpots");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_KITESPOT", payload: json });
      }
    };

    fetchKiteSpots();
  }, [dispatch]);

  return (
    <div className="home">
      <div>
        <MyLocation />
      </div>
      <div className="kitespots">
        {kitespots &&
          kitespots.map((kitespot) => (
            <KiteSpotDetails kitespot={kitespot} key={kitespot.id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
