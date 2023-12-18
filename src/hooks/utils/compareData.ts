import { ContentElement, StorageData } from "../type";

export const mergeStorageData = (
  serverData: StorageData,
  localData: StorageData,
) => {
  const merged: StorageData = {};

  for (const key in serverData) {
    merged[key] = [];
    const serverArr = serverData[key];
    const localArr = localData[key] || [];

    serverArr.forEach((serverEl) => {
      let exists = false;

      localArr.forEach((localEl) => {
        if (serverEl.id === localEl.id) {
          if (serverEl.saveTime > localEl.saveTime) {
            merged[key].push(serverEl);
          } else {
            merged[key].push(localEl);
          }
          exists = true;
        }
      });

      if (!exists) {
        merged[key].push(serverEl);
      }
    });

    localArr.forEach((localEl) => {
      let exists = false;

      merged[key].forEach((mergedEl) => {
        if (localEl.id === mergedEl.id) {
          exists = true;
        }
      });

      if (!exists) {
        merged[key].push(localEl);
      }
    });
  }

  return merged;
};
