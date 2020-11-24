import { Coords } from "leaflet";

export interface TileLayerRef {
  getTileUrl(c: Coords): string;
}
