import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

import { firebaseConfig } from "./fbConfig";

export const fireApp = initializeApp(firebaseConfig);
export const dataBase = getFirestore(fireApp);
// export const dataBase = initializeFirestore(fireApp, {
//   experimentalForceLongPolling: true,
// });
