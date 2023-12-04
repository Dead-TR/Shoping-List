import { createContext } from "react";
import { ModalContextType } from "./type";

export const ModalContext = createContext<ModalContextType>({
  modalName: null,
  setModal: () => {},

  close: () => {},
  isOpen: false,

  state: {
    setState: () => {},
    value: null,
  },
});
