import { LatLng } from "leaflet";
import { Camera } from "../types/Camera";
import { Location } from "./location";

export const initCamera = (loc: LatLng): Camera => ({
  title: "Camera",
  lat: loc.lat,
  lng: loc.lng,
  angle: 80,
  distance: 20,
  orientation: 90,
  geoIndex: Location.getIndexes(loc.lat, loc.lng),
  id: "tobedetermined",
});
