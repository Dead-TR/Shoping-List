import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ModalProps } from "../../config/type";
import { useCategories } from "../../providers/Categories/hook";
import { ButtonsMenu } from "../../components/ButtonsMenu";
import { ModalLayout } from "../../components/ModalLayout";
import { Text } from "../../components/Text";
import { sortCategories } from "../../utils";
import { List } from "./List";

export const EditCategories: FC<ModalProps> = ({ onClose }) => {
  const { categories, updateCategories } = useCategories();
  const [width, setWidth] = useState(0);

  const [sortedCategories, setSortedCategories] = useState(() =>
    sortCategories(categories),
  );

  return (
    <ModalLayout style={css.container}>
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
    paddingTop: 10,
    paddingBottom: 15,
  },

  header: {},
  top: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    fontSize: 15,
  },
});
