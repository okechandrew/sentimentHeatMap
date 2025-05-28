import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { csv } from "d3-fetch";
import "leaflet/dist/leaflet.css";
import { regionCoordinates } from "./regionCoords";

const getColor = (value) => {
  if (value > 0.5) return "green";
  if (value === 0) return "yellow";
  return "red";
};

export default function App() {
  const [sentimentData, setSentimentData] = useState([]);

  useEffect(() => {
    csv("C:\Users\Mirema\sentiment-heatmap\public/geo_sentiments.csv").then((data) => {
      setSentimentData(data);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[37.8, -96]} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {sentimentData.map((row, idx) => {
          const coords = regionCoordinates[row.Region];
          if (!coords) return null;

          return (
            <CircleMarker
              key={idx}
              center={coords}
              radius={10}
              fillOpacity={0.7}
              color={getColor(+row.RandomValue)}
            >
              <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent>
                <div>
                  <strong>{row.Region}</strong><br />
                  Sentiment: {row.RandomValue}
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
