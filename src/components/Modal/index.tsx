import React, { FC, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Teleport } from "../Portal/Teleport";
import { Button } from "../Button";
import { useTeleport } from "../Portal/useTeleport";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  const { clear } = useTeleport();

  useEffect(() => {
    if (!isOpen) clear("modal");
  }, [isOpen]);

  const modalContent = useMemo(
    () => (
      <>
        {isOpen ? (
          <View style={css.modal}>
            <Button style={css.blind} onPress={onClose} />
            <View style={css.container}>{children}</View>
          </View>
        ) : null}
      </>
    ),
    [isOpen, children],
  );

  return <Teleport to="modal">{modalContent}</Teleport>;
};

const css = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  blind: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    backgroundColor: "black",
    opacity: 0.8,
  },
  container: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
