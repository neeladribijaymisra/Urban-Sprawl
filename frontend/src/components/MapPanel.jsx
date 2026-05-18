import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function MapPanel({ points }) {
  return (
    <MapContainer center={[19.076, 72.8777]} zoom={5} scrollWheelZoom className="shadow-soft">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <Marker key={point.id} position={[point.latitude, point.longitude]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">
                {point.cityName} - {point.locationName}
              </div>
              <div>Class: {point.predictedClass}</div>
              <div>Sprawl Score: {(point.sprawlScore * 100).toFixed(0)}%</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
