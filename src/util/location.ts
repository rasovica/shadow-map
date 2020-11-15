import { geoToH3 } from "h3-js";
import { LatLngBounds } from "leaflet";
import geojson2h3 from "geojson2h3";

export class Location {
  static getIndexes = (latitude: number, longitude: number) => {
    return Array(5)
      .fill(null)
      .map((_, index) => Location.getIndex(latitude, longitude, index + 5));
  };
  static getIndex = (latitude: number, longitude: number, res: number) =>
    geoToH3(latitude, longitude, res);
  static getFeatures = (bbox: LatLngBounds, resolution: number): string[] => {
    const fuzzLng = (bbox.getSouthEast().lng - bbox.getSouthWest().lng) * 0.1;
    const fuzzLat = (bbox.getSouthEast().lat - bbox.getNorthEast().lat) * 0.1;

    const bboxFeature = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              bbox.getSouthWest().lng - fuzzLng,
              bbox.getSouthWest().lat + fuzzLat,
            ],
            [
              bbox.getNorthWest().lng - fuzzLng,
              bbox.getNorthWest().lat - fuzzLat,
            ],
            [
              bbox.getNorthEast().lng + fuzzLng,
              bbox.getNorthEast().lat - fuzzLat,
            ],
            [
              bbox.getSouthEast().lng + fuzzLng,
              bbox.getSouthEast().lat + fuzzLat,
            ],
            [
              bbox.getSouthWest().lng - fuzzLng,
              bbox.getSouthWest().lat + fuzzLat,
            ],
          ],
        ],
      },
    };

    return geojson2h3.featureToH3Set(bboxFeature, resolution);
  };
}

export const Ljubljana = {
  lat: 46.05108,
  lng: 14.50513,
};
