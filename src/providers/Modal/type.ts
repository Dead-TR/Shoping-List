import { ModalNames } from "../../config/type";

export interface ModalContextType {
  modalName: ModalNames | null;
  setModal: (name: ModalNames) => void;

  close: () => void;
  isOpen: boolean;

  state: {
    value: any;
    setState: (value: any) => void;
  };
}