import React, { FC, useState } from "react";
import { ModalNames } from "../../config/type";
import { ModalContext } from "./context";

interface Props {
  children?: React.ReactNode;
}

export const ModalProvider: FC<Props> = ({ children }) => {
  const [selectedModalName, setSelectedModalName] = useState<ModalNames | null>(
    null,
  );

  return (
    <ModalContext.Provider
      value={{
        modalName: selectedModalName,
        setModal: (name: ModalNames) => {
          setSelectedModalName(name);
        },

        close: () => {
          setSelectedModalName(null);
        },
        isOpen: !!selectedModalName,
      }}>
      {children}
    </ModalContext.Provider>
  );
};
