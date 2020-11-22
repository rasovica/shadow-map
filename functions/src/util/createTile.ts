import { Change, EventContext } from "firebase-functions/lib/cloud-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

import { Db } from "../index";
import { Camera } from "../../../src/types/Camera";
import { Tile } from "../../../src/types/Tile";

const buildDocumentPath = (c: Camera) => {
  return "tiles/" + c.geoIndex.join("/tiles/");
};

export const createTile = (db: Db) => async (
  change: Change<DocumentSnapshot>,
  context: EventContext
) => {
  const cameraBefore = {
    ...change.before.data(),
    id: change.before.id,
  } as Camera;
  const cameraAfter = {
    ...change.after.data(),
    id: change.after.id,
  } as Camera;
  const tileRef = db.doc(
    buildDocumentPath(change.after.exists ? cameraAfter : cameraBefore)
  );

  await db.runTransaction(async (transaction) => {
    const oldTileDoc = await transaction.get(tileRef);
    const oldTile = oldTileDoc.data() as Tile;

    let newTile: Tile;

    if (!oldTileDoc.exists) {
      newTile = {
        cameras: [cameraAfter],
        cameraCount: 1,
        topLevelIndex: cameraAfter.geoIndex[0],
      };
    } else {
      let oldCameras = oldTile.cameras;
      const cameraIndex = oldCameras.findIndex(
        (i) => i.id === (change.after.exists ? cameraAfter.id : cameraBefore.id)
      );

      if (!change.after.exists) {
        oldCameras.splice(cameraIndex, 1);
      } else if (cameraIndex === -1) {
        oldCameras = [...oldTile.cameras, cameraAfter];
      } else {
        oldCameras[cameraIndex] = cameraAfter;
      }

      newTile = {
        cameras: oldCameras,
        cameraCount: oldCameras.length,
        topLevelIndex: oldTile.topLevelIndex,
      };
    }

    if (newTile.cameraCount === 0) {
      transaction.delete(tileRef);

      return;
    }

    oldTileDoc.exists
      ? transaction.update(tileRef, newTile)
      : transaction.create(tileRef, newTile);
  });

  return null;
};
