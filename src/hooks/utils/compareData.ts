import { ParsedStorageData } from "../type";

export const mergeStorageData = (
  data1: ParsedStorageData,
  data2: ParsedStorageData,
) => {
  const merged: ParsedStorageData = {};

  for (const key in data1) {
    merged[key] = [...(data1[key] || [])];
  }

  for (const key in data2) {
    merged[key] = merged[key] || [];

    data2[key].forEach((el2) => {
      let exists = false;

      merged[key].forEach((el1) => {
        if (el1.id === el2.id) {
          if (el1.saveTime < el2.saveTime) {
            el1.saveTime = el2.saveTime;
          }
          exists = true;
        }
      });

      if (!exists) {
        merged[key].push(el2);
      }
    });
  }

  return merged;
};
