/**ContentElement
 ** this is the root element that will be sent to the server
 */
export interface ContentElement {
  [key: string]: any;
  id: number;
  saveTime: number;
}

/**storageKey: { saveTime: number } */
export type StorageData = Record<string, ContentElement[]>;
