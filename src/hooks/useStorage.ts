import { useEffect, useState } from "react";

import { Storage } from "./storage";
import { ContentElement } from "./type";

const loading: {
  isLoad: boolean;
  onLoad: (() => void)[];
} = {
  isLoad: false,
  onLoad: [],
};

const storage = new Storage(() => {
  loading.isLoad = true;
  loading.onLoad.forEach((f) => f());
});

export const useStorage = <V extends ContentElement>(
  key: string,
  onlyLocal?: boolean,
) => {
  const [data, setData] = useState<V[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(loading.isLoad);
  const [isSync, setIsSync] = useState(false);

  const setValue = (newValue: V[] | null) => {
    try {
      setData(newValue);

      if (!newValue) {
        if (isLoaded) {
          storage.remove(key);
        }
      } else {
        storage.save(key, newValue, onlyLocal);
      }
      storage.emitter.emit(key, newValue);
    } catch (e) {
      console.error("setValue error", e);
    }
  };

  useEffect(() => {
    const listener = (value: V[]) => {
      setData(value);
    };
    const rm = storage.emitter.addListener(key, listener);
    const syncRm = storage.loaderListener((is) => {
      setIsSync(is);
    });

    if (!loading.isLoad) {
      const onLoad = async () => {
        const result = await storage.get<V>(key);

        if (key) setData(result);

        setIsLoaded(true);
      };

      loading.onLoad.push(onLoad);
    }

    return () => {
      rm();
      syncRm();
    };
  }, [key]);

  useEffect(() => {
    if (isLoaded && !data) {
      storage.get<V>(key).then((value) => {
        setData(value);
      });
    }
  }, [isLoaded]);

  return {
    value: data,
    setValue,
    isLoaded,
    isSync,
  };
};
