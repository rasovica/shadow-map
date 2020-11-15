import { LatLng } from "leaflet";

export function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export const bearing = (start: LatLng, end: LatLng) => {
  const startLat = toRadians(start.lat);
  const startLng = toRadians(start.lng);
  const destLat = toRadians(end.lat);
  const destLng = toRadians(end.lng);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  const brng = Math.atan2(y, x);

  return (toDegrees(brng) + 360) % 360;
};
