import { createContext } from "react";
import { ModalNames } from "../../config/type";

export const ModalContext = createContext<{
  modalName: ModalNames | null;
  setModal: (name: ModalNames) => void;

  close: () => void;
  isOpen: boolean;
}>({
  modalName: null as ModalNames | null,
  setModal: (name: ModalNames) => {},

  close: () => {},
  isOpen: false,
});
