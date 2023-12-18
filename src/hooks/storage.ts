import LocalStorage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import EventEmitter from "events";
import { addEventListener } from "@react-native-community/netinfo";

import {
  EVENT_LISTENER_KEY,
  ON_LOAD_LISTENER as ON_LOAD_EVENT,
  storeKeysList,
} from "./config";
import { mergeStorageData } from "./utils";
import { ContentElement, StorageData } from "./type";
import { dataBase } from "../fireBase";
import { between } from "../utils";

export class Storage {
  constructor(onLoad: () => void) {
    this.getData(onLoad);

    let connectionChanged = false;
    let prevConnectValue: boolean | null = null;
    let ticks = 0;

    addEventListener(({ isConnected }) => {
      if (prevConnectValue !== null) {
        if (isConnected !== prevConnectValue) {
          connectionChanged = true;
          ticks = 0;
        }
      }

      prevConnectValue = isConnected;
      ticks++;

      if (connectionChanged && ticks === 1 && isConnected) {
        this.getData();
      }
    });
  }

  emitter = new StoreEmitter();

  private localStorage = new LocalStorage({
    defaultExpires: null,
    storageBackend: AsyncStorage,
  });
  private store: StorageData = {};

  private async getData(onLoad?: () => void) {
    this.emitter.emit(ON_LOAD_EVENT, true);
    try {
      const localData = await this.getLocalData();
      const serverData = await this.getDataFromServer();
      this.syncData(localData, serverData);
    } catch (e) {
      console.error(e);
    }

    onLoad && onLoad();
    this.emitter.emit(ON_LOAD_EVENT, false);
  }

  private syncData = async (
    localData: StorageData,
    serverData: StorageData,
  ) => {
    const mergedData = mergeStorageData(serverData, localData);
    const syncEntries = Object.entries(mergedData);

    for (const [key, value] of syncEntries) {
      this.emitter.emit(key, value);
      await this.save(key, value);
    }
  };

  private getLocalData = async () => {
    const localData: typeof this.store = {};
    try {
      for (const key of storeKeysList) {
        const element = await this.localStorage.load({ key });
        if (element) {
          localData[key] = element;
        }

        this.emitter.emit(key, element);
      }
    } catch (e) {
      console.error("cant load local data:", e);
    }

    this.store = localData;
    return localData;
  };

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
    this.emitter.emit(ON_LOAD_EVENT, true);

    try {
      await this.localStorage.remove({ key });
      const currentCollection = doc(dataBase, "list", key);
      await deleteDoc(currentCollection);
    } catch (e) {
      console.error("remove error", e);
    }
    this.emitter.emit(ON_LOAD_EVENT, false);
  };
  save = async <V extends ContentElement>(
    key: string,
    valueData: V[],
    onlyLocal?: boolean,
  ) => {
    try {
      const date = Date.now();
      this.emitter.emit(ON_LOAD_EVENT, true);

      valueData.forEach((e) => {
        if (!e.id) e.id = Number("" + date + between(1, 9999) * between(1, 5));
        e.saveTime = date;
      });

      this.store[key] = valueData;
      this.localStorage.save({ key, data: valueData });

      if (!onlyLocal) {
        // list -- collection
        // key -- document
        const docs = doc(dataBase, "list", key);
        await setDoc(docs, { rawData: valueData }, { merge: true });
      }
    } catch (e) {
      console.error("save error ", e);
    }

    this.emitter.emit(ON_LOAD_EVENT, false);
  };
  get = async <V extends ContentElement>(key: string): Promise<V[] | null> => {
    try {
      if (this.store[key]) return this.store[key] as V[];
      const result = await this.localStorage.load({ key });
      if (result) return result as V[];
      return null;
    } catch (e) {
      console.error("get error", e);

      return null;
    }
  };

  loaderListener = (callBack: (isLoad: boolean) => void) =>
    this.emitter.addListener(ON_LOAD_EVENT, callBack);
}

class StoreEmitter {
  constructor() {
    this.emitter.setMaxListeners(25);
  }
  private emitter = new EventEmitter();

  addListener = <V extends any>(key: string, callBack: (value: V) => void) => {
    this.emitter.addListener(EVENT_LISTENER_KEY + key, callBack);

    return () => {
      this.emitter.removeListener(EVENT_LISTENER_KEY + key, callBack);
    };
  };

  emit = <V extends any>(key: string, value: V) => {
    this.emitter.emit(EVENT_LISTENER_KEY + key, value);
  };
}
