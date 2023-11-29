import React, { FC, Fragment } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonsMenu } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { useCategories } from "../../providers/Categories/hook";
import { ModalProps } from "../../config/type";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const EditCategory: FC<ModalProps> = ({ onClose }) => {
  const { categories, updateCategories } = useCategories();

  return (
    <ModalLayout style={css.container}>
      <View style={css.header}>
        <Text style={css.top}>{`Редагувати Категорії`.toUpperCase()}</Text>
      </View>

      <View style={css.list}>
        {categories
          .sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          })
          .map((value, i) => {
            const { color, name = "" } = value;
            return (
              <Fragment key={`${color}_${name}_${i}`}>
                <View style={{ ...css.category, backgroundColor: color }}>
                  <Input
                    container={{ style: css.inputBox }}
                    style={css.input}
                    defaultValue={name}
                    handleOk={(v) => (value.name = v)}
                  />

                  <Button style={css.move}></Button>
                </View>
              </Fragment>
            );
          })}
      </View>
      <ButtonsMenu
        buttons={[
          { icon: "close", onPress: () => onClose() },
          {
            icon: "ok",
            onPress: () => {
              debugger;
              updateCategories([...categories]);
              onClose();
            },
          },
        ]}
      />
    </ModalLayout>
  );
};

const css = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 15,
  },

  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    padding: 10,
    paddingBottom: 15,
    gap: 10,
    width: "100%",
  },
  category: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    paddingRight: 10,

    flexDirection: "row",
    gap: 10,
    width: "100%",
    borderRadius: 10,
  },

  move: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1.5,
  },

  header: {},
  top: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    fontSize: 15,
  },
  input: {},
  inputBox: {
    flex: 1,
  },
});
