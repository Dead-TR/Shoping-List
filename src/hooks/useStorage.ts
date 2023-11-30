import { useEffect, useState } from "react";
import EventEmitter from "events";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from "react-native-storage";

const storageEmitter = new EventEmitter();
const storage = new Storage({
  defaultExpires: null,
  storageBackend: AsyncStorage,
});

const EVENT_LISTENER = "eventListener-";

export const useStorage = (key: string) => {
  const [data, setData] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const setValue = (newValue: string | null) => {
    try {
      setData(newValue);

      if (!newValue) {
        if (isLoaded) {
          storage.remove({ key });
        }
      } else {
        storage.save({ key, data: newValue });
      }
      storageEmitter.emit(EVENT_LISTENER + key, newValue);
    } catch (e) {
      console.error("setValue error", e);
    }
  };

  useEffect(() => {
    const listener = (value: string) => {
      setData(value);
    };
    storageEmitter.addListener(EVENT_LISTENER + key, listener);

    storage
      .load({ key })
      .then((result) => {
        setValue((result as string) || null);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoaded(true);
      });

    return () => {
      storageEmitter.removeListener(EVENT_LISTENER + key, listener);
    };
  }, [key]);

  return {
    value: data,
    setValue,
    isLoaded,
  };
};
