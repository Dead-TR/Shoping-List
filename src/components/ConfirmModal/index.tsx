import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Modal } from "../Modal";
import { ButtonsMenu } from "../ButtonsMenu";
import { Text } from "../Text";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
}

export const Confirm: FC<Props> = ({ isOpen, onClose, onOk, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <View style={css.modal}>
        {typeof children === "string" ? (
          <Text style={css.confirmText}>{children}</Text>
        ) : (
          children
        )}

        <ButtonsMenu
          buttons={[
            { icon: "close", onPress: onClose },
            {
              icon: "ok",
              onPress: () => {
                onClose();
                onOk();
              },
            },
          ]}
        />
      </View>
    </Modal>
  );
};

const css = StyleSheet.create({
  modal: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 10,
    minWidth: 300,
  },
  confirmText: {
    textAlign: "center",
    color: "white",
    padding: 5,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
