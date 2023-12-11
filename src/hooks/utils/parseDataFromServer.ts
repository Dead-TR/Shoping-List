import { ParsedElement, ParsedStorageData } from "../type";

export const parseData = (data: Record<string, string>) => {
  return Object.entries(data).reduce((acm, [key, value]) => {
    try {
      const parsedData = JSON.parse(value || "null") as ParsedElement[] | null;
      if (parsedData) acm[key] = parsedData;
    } catch (e) {
      console.error(e);
    }
    return acm;
  }, {} as ParsedStorageData);
};
