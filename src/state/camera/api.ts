import { tileRef } from "../firebase";
import { Tile } from "../../types/Tile";

export const getCamerasForIndex = async (index: string) => {
  const tiles = await tileRef.where("topLevelIndex", "==", index).get();

  return tiles.docs.flatMap((doc) => (doc.data() as Tile).cameras);
};
