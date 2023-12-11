export interface ParsedElement {
  [key: string]: any;
  id: number;
  saveTime: number;
}

/**storageKey: { saveTime: number } */
export type ParsedStorageData = Record<string, ParsedElement[]>;
