import { Camera } from "./Camera";

export interface Tile {
  cameras: Camera[];
  cameraCount: number;
  topLevelIndex: string;
}
