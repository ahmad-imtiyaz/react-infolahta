import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const InteractiveMap = ({ assets, onAssetSelect, selectedAsset }) => {
  const defaultCenter = [-7.2575, 112.7521]; // Surabaya coordinates

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={defaultCenter}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {assets.map((asset) => (
          <Marker
            key={asset.id}
            position={asset.coordinates}
            eventHandlers={{
              click: () => onAssetSelect(asset),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{asset.lokasi}</h3>
                <p>Korem: {asset.korem}</p>
                <p>Kodim: {asset.kodim}</p>
                <p>Status: {asset.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
