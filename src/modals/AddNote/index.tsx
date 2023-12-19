import React, {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";

import { ButtonsMenu, ButtonsMenuProps } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { ModalProps } from "../../config/type";
import { useCategories } from "../../providers/Categories/hook";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { useShopList } from "../../providers/ShopList/hook";
import { arraySwap, sortCategories } from "../../utils";

export const AddNote: FC<ModalProps> = ({ onClose, state }) => {
  const { categories } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(-1);
  const value = useRef("");
  const [editMode, setEditMode] = useState(false);

  const [defaultValue, setDefaultValue] = useState("");

  const values = useRef({
    currentCategory,
    categories,
  });

  const { addElement, editElement, removeElement } = useShopList();

  const sortedCategories = sortCategories(categories);

  useEffect(() => {
    try {
      if (state?.value?.type === "edit") {
        setEditMode(true);
        const { element } = state.value;
        const { id, color, text } = element;
        setDefaultValue(text);
        value.current = text;
        const catIndex = sortedCategories.findIndex((v) => v.color === color);
        setCurrentCategory(catIndex);
      }
    } catch (e) {
      console.error(e);
    }
  }, [state?.value]);

  useEffect(() => {
    values.current.categories = categories;
    values.current.currentCategory = currentCategory;
  }, [currentCategory, categories]);

  const close = () => {
    requestAnimationFrame(() => onClose());
  };

  const buttons = useMemo(() => {
    const buttons: ButtonsMenuProps["buttons"] = [
      { icon: "close", onPress: close },
      {
        icon: "ok",
        onPress: () => {
          try {
            if (
              values.current.currentCategory < 0 ||
              !value.current ||
              !values.current.categories.length
            )
              return;
            const selectedColor =
              values.current.categories[values.current.currentCategory].color;

            if (editMode) {
              const { element } = state.value;
              const { id } = element;
              editElement(id, value.current, selectedColor);
            } else {
              addElement(selectedColor, value.current);
            }

            close();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ];

    if (editMode) {
      buttons.push({
        icon: "trash",
        onPress: () => {
          try {
            const { element } = state.value;
            const { id } = element;
            removeElement(id);
            close();
          } catch (e) {
            console.error(e);
          }
        },
      });

      arraySwap(buttons, 1, 2);
    }

    return buttons;
  }, [editMode]);

  return (
    <ModalLayout style={css.container}>
      <View style={css.header}>
        <Input
          placeholder="Введіть текст"
          placeholderTextColor={css.input.color}
          style={css.input}
          color="white"
          handleOk={(v) => (value.current = v)}
          onChangeText={(v) => (value.current = v)}
          defaultValue={defaultValue}
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
                  borderColor: currentCategory === i ? "#ffffff" : color,
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
      <ButtonsMenu buttons={buttons} />
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
    width: "30%",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
  },
  buttonText: {
    textAlign: "center",
  },

  input: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  header: {
    marginHorizontal: 10,
  },
});
