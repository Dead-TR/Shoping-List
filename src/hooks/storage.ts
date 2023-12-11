import LocalStorage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { mergeStorageData, parseData } from "./utils";
import { storeKeysList } from "./config";
import { ParsedElement } from "./type";
import { dataBase } from "../fireBase";
import { between } from "../utils";

export class Storage {
  constructor(onLoad: () => void) {
    this.getData(onLoad);
  }
  private localStorage = new LocalStorage({
    defaultExpires: null,
    storageBackend: AsyncStorage,
  });
  private store: Record<string, string> = {};

  private async getData(onLoad: () => void) {
    try {
      const serverData = await this.getDataFromServer();
      const localData: typeof this.store = {};

      try {
        for (const key of storeKeysList) {
          const element = await this.localStorage.load({ key });
          if (element) {
            localData[key] = element as unknown as string;
          }
        }
      } catch (e) {
        console.error("cant load local data:", e);
      }

      const parsedServerData = parseData(serverData);
      const parsedLocalData = parseData(localData);

      const mergedData = mergeStorageData(parsedServerData, parsedLocalData);

      const syncEntries = Object.entries(mergedData);

      for (const [key, value] of syncEntries) {
        const stringifiedElement = JSON.stringify(value);
        await this.save(key, stringifiedElement);
      }
    } catch (e) {
      console.error(e);
    }

    onLoad();
  }

  private async getDataFromServer() {
    try {
      const currentCollection = collection(dataBase, "list");
      const docs = await getDocs(currentCollection);
      const data = docs.docs.reduce((acm, doc) => {
        const data = doc.data();
        acm[doc.id] = data?.rawData || null;

        return acm;
      }, {} as typeof this.store);

      return data;
    } catch (e) {
      console.error("getDataFromServer error ", e);
      return {};
    }
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
      const parsedData = JSON.parse(value) as ParsedElement[];
      const date = Date.now();

      parsedData.forEach((e) => {
        if (!e.id) e.id = Number("" + date + between(1, 9999) * between(1, 5));
        e.saveTime = date;
      });

      const stringData = JSON.stringify(parsedData);
      this.store[key] = stringData;
      this.localStorage.save({ key, data: stringData });

      if (!onlyLocal) {
        // list -- collection
        // key -- document
        const docs = doc(dataBase, "list", key);
        await setDoc(docs, { rawData: stringData });
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
