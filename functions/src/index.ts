import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { createTile } from "./util/createTile";

// [START_EXCLUDE]
const db = admin.initializeApp().firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
// [END_EXCLUDE]

export type Db = typeof db;

// [START create_tiles]
export const createTilesFunction = functions.firestore
  .document("cameras/{cameraId}")
  .onWrite(createTile(db));
