import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface PMData {
  lat: number;
  lon: number;
  predicted_pm25: number;
}

interface Props {
  data: PMData[];
}

export default function PollutionMap({ data }: Props) {
  const center: LatLngExpression = [22.9734, 78.6569];

  return (
    <MapContainer center={center} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((point, idx) => {
        const position: LatLngExpression = [point.lat, point.lon];
        return (
          <CircleMarker
            key={idx}
            center={position}
            radius={8}
            fillOpacity={0.8}
            color={getColor(point.predicted_pm25)}
          >
            <Tooltip>
              <span>
                PM2.5: {point.predicted_pm25} µg/m³<br />
                Lat: {point.lat}, Lon: {point.lon}
              </span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

function getColor(pm: number): string {
  if (pm > 200) return 'red';
  if (pm > 100) return 'orange';
  return 'green';
}
