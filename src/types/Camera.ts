export interface Camera {
  angle: number;
  distance: number;
  lat: number;
  lng: number;
  orientation: number;

  geoIndex: string[];
  title: string;
  id: string;
  owner: string;
}
