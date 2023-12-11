import { useEffect, useState } from "react";
import EventEmitter from "events";
import { Storage } from "./storage";
import { EVENT_LISTENER_KEY } from "./config";

const loading: {
  isLoad: boolean;
  onLoad: (() => void)[];
} = {
  isLoad: false,
  onLoad: [],
};

const storageEmitter = new EventEmitter();
const storage = new Storage(() => {
  loading.isLoad = true;
  loading.onLoad.forEach((f) => f());
});


export const useStorage = (key: string, onlyLocal?: boolean) => {
  const [data, setData] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(loading.isLoad);

  const setValue = (newValue: string | null) => {
    try {
      setData(newValue);

      if (!newValue) {
        if (isLoaded) {
          storage.remove(key);
        }
      } else {
        storage.save(key, newValue, onlyLocal);
      }
      storageEmitter.emit(EVENT_LISTENER_KEY + key, newValue);
    } catch (e) {
      console.error("setValue error", e);
    }
  };

  useEffect(() => {
    const listener = (value: string) => setData(value);
    storageEmitter.addListener(EVENT_LISTENER_KEY + key, listener);

    if (!loading.isLoad) {
      const onLoad = async () => {
        const result = await storage.get(key);
        setData(result);

        setIsLoaded(true);
      };

      loading.onLoad.push(onLoad);
    }

    return () => {
      storageEmitter.removeListener(EVENT_LISTENER_KEY + key, listener);
    };
  }, [key]);

  useEffect(() => {
    if (isLoaded && !data) {
      storage.get(key).then((value) => setData(value));
    }
  }, [isLoaded]);

  return {
    value: data,
    setValue,
    isLoaded,
  };
};
