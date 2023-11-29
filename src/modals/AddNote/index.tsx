import React, { FC, Fragment } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonsMenu } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { ModalProps } from "../../config/type";
import { useCategories } from "../../providers/Categories/hook";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const AddNote: FC<ModalProps> = ({}) => {
  const { categories } = useCategories();
  return (
    <ModalLayout style={css.container}>
      <View style={css.header}>
        <Input style={css.input} color="white" />
      </View>

      <View style={css.buttons}>
        {categories
          .sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          })
          .map(({ color, name }, i) => {
            return (
              <Fragment key={`${color}_${name}_${i}`}>
                <Button style={{ ...css.button, backgroundColor: color }}>
                  {name || " "}
                </Button>
              </Fragment>
            );
          })}
      </View>
      <ButtonsMenu buttons={[{ icon: "close" }, { icon: "ok" }]} />
    </ModalLayout>
  );
};

const css = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 15,
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    padding: 10,
    paddingBottom: 15,
    gap: 10,
  },
  button: {
    padding: 7,
    minHeight: 30,
    width: "31%",
    color: "#000",
    borderRadius: 10,
  },

  header: {},
  input: {
    paddingHorizontal: 10,
    color: "white",
  },
});
