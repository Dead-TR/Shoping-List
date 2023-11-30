import React, { FC, Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonsMenu } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { ModalProps } from "../../config/type";
import { useCategories } from "../../providers/Categories/hook";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { useShopList } from "../../providers/ShopList/hook";

export const AddNote: FC<ModalProps> = ({ onClose }) => {
  const { categories } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [value, setValue] = useState("");

  const { addElement } = useShopList();

  return (
    <ModalLayout style={css.container}>
      <View style={css.header}>
        <Input
          placeholder="Введіть текст"
          placeholderTextColor={css.input.color}
          style={css.input}
          color="white"
          handleOk={setValue}
        />
      </View>

      <View style={css.buttons}>
        {categories
          .sort((a, b) => {
            return (a.order || 0) - (b.order || 0);
          })
          .map(({ color, name }, i) => {
            return (
              <Fragment key={`${color}_${name}_${i}`}>
                <Button
                  style={{
                    ...css.button,
                    backgroundColor: color,
                    ...(currentCategory === i ? css.selected : {}),
                  }}
                  onPress={() => setCurrentCategory(i)}>
                  <Text style={css.buttonText}>{name || " "}</Text>
                </Button>
              </Fragment>
            );
          })}
      </View>
      <ButtonsMenu
        buttons={[
          { icon: "close", onPress: onClose },
          {
            icon: "ok",
            onPress: () => {
              const selectedColor = categories[currentCategory].color;
              addElement(selectedColor, value);
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
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
  },
  buttonText: {
    textAlign: "center",
  },
  selected: {
    borderColor: "white",
  },

  input: {
    color: "white",
    textAlign: "center",
  },
  header: {
    marginHorizontal: 10,
  },
});
