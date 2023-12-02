import AsyncStorage from "@react-native-community/async-storage";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { dataBase } from "./fireBase";

interface Result {
  rawData: string;
}

export class FirebaseAsyncStorage {
  setItem = async (...params: Parameters<(typeof AsyncStorage)["setItem"]>) => {
    const [key, value, callBack] = params;
    console.log("key, value ~> ", key, value);

    try {
      // list -- collection
      // key -- document
      const docs = doc(dataBase, "list", key);
      const valueData = JSON.parse(value) as any;
      const result = await setDoc(docs, valueData);
    } catch {
      return AsyncStorage.setItem(key, value, callBack);
    }
  };
  getItem = async (...params: Parameters<(typeof AsyncStorage)["getItem"]>) => {
    const [key, callBack] = params;

    try {
      const currentCollection = collection(dataBase, "list");
      const docs = await getDocs(currentCollection);
      const data = docs.docs
        .map((doc) => {
          if (doc.id === key) {
            const data = doc.data();
            return data?.rawData;
          }

          return null;
        })
        .filter((v) => !!v)[0]
      console.log("~", key, data);

      if (!data || !data.length) {
        callBack && callBack(null, null);
        return JSON.stringify({
          // rawData: null,
        });
      }

      const result = data

      callBack && callBack(null, result);

      debugger
      return result;
    } catch {
      const result = await AsyncStorage.getItem(key, callBack);
      // result === "{rawData: string}"
      return result;
    }
  };
  removeItem = async (
    params: Parameters<(typeof AsyncStorage)["removeItem"]>,
  ) => {
    const [key, callBack] = params;
    return AsyncStorage.removeItem(key, callBack);
  };
  clear = async (params: Parameters<(typeof AsyncStorage)["clear"]>) => {
    const [callback] = params;
    return AsyncStorage.clear(callback);
  };
}
