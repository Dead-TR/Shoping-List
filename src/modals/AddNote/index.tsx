import React, { FC, Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ButtonsMenu } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { ModalProps } from "../../config/type";
import { useCategories } from "../../providers/Categories/hook";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { useShopList } from "../../providers/ShopList/hook";
import { CategoryType } from "../../providers/Categories/type";

export const AddNote: FC<ModalProps> = ({ onClose, state }) => {
  console.log("🚀 ~ file: index.tsx:14 ~ state:", state);
  const { categories } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [value, setValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { addElement } = useShopList();

  const sortedCategories = sortCategories(categories);

  useEffect(() => {
    try {
      if (state?.value?.type === "edit") {
        setEditMode(true);
        const { element } = state.value;
        const { id, color, text } = element;
        setValue(text);
        const catIndex = sortedCategories.findIndex((v) => v.color === color);
        setCurrentCategory(catIndex);
      }
    } catch (e) {
      console.error(e);
    }
  }, [state?.value]);

  const close = () => {
    requestAnimationFrame(() => onClose());
  };

  return (
    <ModalLayout style={css.container}>
      <View style={css.header}>
        <Input
          placeholder="Введіть текст"
          placeholderTextColor={css.input.color}
          style={css.input}
          color="white"
          handleOk={setValue}
          onChangeText={editMode ? setValue : undefined}
          value={editMode ? value : undefined}
        />
      </View>

      <View style={css.buttons}>
        {sortedCategories.map(({ color, name }, i) => {
          return (
            <Fragment key={`${color}_${name}_${i}`}>
              <Button
                style={{
                  ...css.button,
                  backgroundColor: color,
                  ...(currentCategory === i ? css.selected : {}),
                }}
                onPress={() => setCurrentCategory(i)}>
                <Text style={css.buttonText} numberOfLines={1}>
                  {name || " "}
                </Text>
              </Button>
            </Fragment>
          );
        })}
      </View>
      <ButtonsMenu
        buttons={[
          { icon: "close", onPress: close },
          {
            icon: "ok",
            onPress: () => {
              const selectedColor = categories[currentCategory].color;
              addElement(selectedColor, value);
              close();
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

const sortCategories = (categories: CategoryType[]) =>
  categories.sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });
