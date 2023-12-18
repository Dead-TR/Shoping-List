import React, { FC, useCallback, useMemo } from "react";
import { useModal } from "../../providers/Modal/hook";
import { ModalNames, ModalProps } from "../../config/type";
import { modals } from "../../config/routes";
import { PortalGate } from "../../components/Portal/Gate";
import { Modal } from "../../components/Modal";

export const ModalContainer: FC = ({}) => {
  const { modalName, isOpen, close, state } = useModal();

  const Component = useCallback(
    (props: ModalProps) => {
      const CurrentModal =
        modals[(modalName || "") as ModalNames] ||
        ((props: ModalProps) => null);

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

      {isOpen ? <Component onClose={close} state={state} /> : null}
    </>
  );
};
