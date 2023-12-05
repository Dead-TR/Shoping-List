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
import { CategoryType } from "../../providers/Categories/type";
import { arraySwap } from "../../utils";

export const AddNote: FC<ModalProps> = ({ onClose, state }) => {
  const { categories } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [value, setValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  const values = useRef({
    value,
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
        setValue(text);
        const catIndex = sortedCategories.findIndex((v) => v.color === color);
        setCurrentCategory(catIndex);
      }
    } catch (e) {
      console.error(e);
    }
  }, [state?.value]);

  useEffect(() => {
    values.current.value = value;
    values.current.categories = categories;
    values.current.currentCategory = currentCategory;
  }, [value, currentCategory, categories]);

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
            debugger;

            if (
              values.current.currentCategory < 0 ||
              !values.current.value ||
              !values.current.categories.length
            )
              return;
            const selectedColor =
              values.current.categories[values.current.currentCategory].color;

            if (editMode) {
              const { element } = state.value;
              const { id } = element;
              editElement(id, values.current.value, selectedColor);
            } else {
              addElement(selectedColor, values.current.value);
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
          handleOk={setValue}
          onChangeText={editMode ? setValue : undefined}
          value={editMode ? value : undefined}
        />
      </View>

      <View style={css.buttons}>
        {sortedCategories.map(({ color, name,  }, i) => {
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
