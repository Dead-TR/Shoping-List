import LocalStorage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { dataBase } from "../fireBase";

export class Storage {
  constructor(onLoad: () => void) {
    this.getDataFromServer(onLoad);
  }

  private store: Record<string, string> = {};

  private localStorage = new LocalStorage({
    defaultExpires: null,
    storageBackend: AsyncStorage,
  });

  private async getDataFromServer(onLoad: () => void) {
    try {
      const currentCollection = collection(dataBase, "list");
      const docs = await getDocs(currentCollection);
      const data = docs.docs.reduce((acm, doc) => {
        const data = doc.data();
        acm[doc.id] = data?.rawData || null;

        return acm;
      }, {} as typeof this.store);
      this.store = data;
    } catch (e) {
      console.error("getDataFromServer error", e);
    }

    onLoad();
  }

  remove = async (key: string) => {
    try {
      await this.localStorage.remove({ key });
      const currentCollection = doc(dataBase, "list", key);
      await deleteDoc(currentCollection);
    } catch (e) {
      console.error("remove error", e);
    }
  };
  save = async (key: string, value: string, onlyLocal?: boolean) => {
    try {
      this.store[key] = value;
      this.localStorage.save({ key, data: value });

      if (!onlyLocal) {
        // list -- collection
        // key -- document
        const docs = doc(dataBase, "list", key);
        await setDoc(docs, { rawData: value });
      }
    } catch (e) {
      console.error("save error ", e);
    }
  };
  get = async (key: string): Promise<string | null> => {
    try {
      if (this.store[key]) return this.store[key];
      const result = await this.localStorage.load({ key });
      if (result) return result as string;
      return null;
    } catch (e) {
      console.error("get error", e);

      return null;
    }
  };
}
