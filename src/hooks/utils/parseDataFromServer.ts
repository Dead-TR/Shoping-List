import { ContentElement, StorageData } from "../type";

export const parseData = (data: Record<string, string>) => {
  return Object.entries(data).reduce((acm, [key, value]) => {
    try {
      const parsedData = JSON.parse(value || "null") as ContentElement[] | null;
      if (parsedData) acm[key] = parsedData;
    } catch (e) {
      console.error(e);
    }
    return acm;
  }, {} as StorageData);
};
