import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import { firebaseConfig } from "./fbConfig";

export const fireApp = initializeApp(firebaseConfig);
export const dataBase = getFirestore(fireApp);
