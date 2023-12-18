import React, { FC, useCallback } from "react";

import { ModalNames, ModalProps } from "../../config/type";
import { PortalGate } from "../../components/Portal/Gate";
import { useModal } from "../../providers/Modal/hook";
import { Modal } from "../../components/Modal";
import { modals } from "../../config/routes";

export const ModalContainer: FC = ({}) => {
  const { modalName, isOpen, close, state } = useModal();

  const Component = useCallback(
    (props: ModalProps) => {
      const CurrentModal =
        modals[(modalName || "") as ModalNames] ||
        ((props: ModalProps) => null);

      if (!isOpen) return null;
      return (
        <Modal isOpen={isOpen} onClose={close}>
          <CurrentModal {...props} />
        </Modal>
      );
    },
    [isOpen, modalName],
  );

  return (
    <>
      <PortalGate gateName="modal" />
      <Component onClose={close} state={state} />
    </>
  );
};
