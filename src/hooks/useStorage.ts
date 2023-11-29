import { useEffect, useState } from "react";
import EventEmitter from "events";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from "react-native-storage";

const storageEmitter = new EventEmitter();
const storage = new Storage({
  defaultExpires: null,
  storageBackend: AsyncStorage,
});

const EVENT_LISTENER = "EVENT_LISTENER_";

export const useStorage = (key: string) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const listener = (value: string) => {
      setData(value);
    };
    storageEmitter.addListener(EVENT_LISTENER + key, listener);

    storage.load({ key }).then((result) => {
      setData((result as string) || null);
    });

    return () => {
      storageEmitter.removeListener(EVENT_LISTENER + key, listener);
    };
  }, [key]);

  const setValue = (newValue: string | null) => {
    try {
      setData(newValue);

      if (!newValue) storage.remove({ key });
      else storage.save({ key, data });
      storageEmitter.emit(key, newValue);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    value: data,
    setValue,
  };
};
