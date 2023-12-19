import React, { FC, memo, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { CategoryType } from "../../providers/Categories/type";
import { Draggable } from "../../components/Draggable";
import { moveArrayTo } from "../../utils/moveArray";
import { Element } from "./Element";

interface Props {
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
  width: number;
}

export const List: FC<Props> = ({ categories, setCategories, width }) => {
  return (
    <View style={css.list}>
      <Draggable
        data={categories}
        keyExtractor={({ color, name }) => `${color}_${name}_`}
        renderItem={(data) => {
          const { item, separators, index, isActive, onDragEnd, onDragStart } =
            data;

          return (
            <Element
              item={item}
              width={width}
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
            />
          );
        }}
        onReordered={(oldI, newI) => {
          categories[oldI].order = newI;

          const newList = moveArrayTo(categories, oldI, newI);

          newList.forEach((item, i) => {
            item.order = i;
          });

          setCategories(newList);
        }}
      />
    </View>
  );
};

const css = StyleSheet.create({
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
});

