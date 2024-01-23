import { useEffect, useState } from "react";

// components
import KiteSpotDetails from "../components/KiteSpotDetails";
import MyLocation from "../components/MyLocation";

const Home = () => {
  const [kiteSpots, setKiteSpots] = useState(null);

  useEffect(() => {
    const fetchKiteSpots = async () => {
      const response = await fetch("/api/kiteSpots");
      const json = await response.json();

      if (response.ok) {
        setKiteSpots(json);
      }
    };

    fetchKiteSpots();
  }, []);

  return (
    <div className="home">
      <div>
        <MyLocation />
      </div>
      <div className="workouts">
        {kiteSpots &&
          kiteSpots.map((kitespot) => (
            <KiteSpotDetails kitespot={kitespot} key={kitespot.id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
