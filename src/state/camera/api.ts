import { camerasRef } from "../firebase";

export const getCamerasForIndex = async (index: string) => {
  const cameras = await camerasRef
    .where("geoIndex", "array-contains", index)
    .get();

  return cameras.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
