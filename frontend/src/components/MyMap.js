import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const MyMap = ({ kitespotlat, kitespotlng }) => {
  const position = [kitespotlat, kitespotlng]; // latitude and longitude
  const zoomLevel = 13;

  return (
    <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MyMap;
