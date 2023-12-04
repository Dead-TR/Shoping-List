import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "./fbConfig";

export const fireApp = initializeApp(firebaseConfig);
export const dataBase = getFirestore(fireApp);
