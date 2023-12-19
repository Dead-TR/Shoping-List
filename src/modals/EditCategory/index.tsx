import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useCategories } from "../../providers/Categories/hook";
import { CategoryType } from "../../providers/Categories/type";
import { ButtonsMenu } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { ModalProps } from "../../config/type";
import { Text } from "../../components/Text";
import { sortCategories } from "../../utils";
import { List } from "./List";

export const EditCategories: FC<ModalProps> = ({ onClose }) => {
  const { categories, updateCategories } = useCategories();
  const [width, setWidth] = useState(0);

  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    setSortedCategories(sortCategories(categories));
  }, []);

  return (
    <ModalLayout style={{ ...css.container, opacity: width ? 1 : 0 }}>
      <View
        onLayout={({
          nativeEvent: {
            layout: { width, height, x, y },
          },
        }) => {
          setWidth(width);
        }}>
        <View style={css.header}>
          <Text style={css.top}>{`Редагувати Категорії`.toUpperCase()}</Text>
        </View>

        <List
          width={width}
          categories={sortedCategories}
          setCategories={setSortedCategories}
        />

        <ButtonsMenu
          buttons={[
            { icon: "close", onPress: () => onClose() },
            {
              icon: "ok",
              onPress: () => {
                updateCategories(sortedCategories);
                onClose();
              },
            },
          ]}
        />
      </View>
    </ModalLayout>
  );
};

const css = StyleSheet.create({
  container: {
    // paddingTop: 10,
    // paddingBottom: 15,
  },

  header: {},
  top: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
});
