import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CategoryType } from "../../providers/Categories/type";

interface Props {
  width: number;
  item: CategoryType;

  onDragEnd: () => void;
  onDragStart: () => void;

}

export const Element: FC<Props> = ({
  item,
  onDragEnd,
  onDragStart,
  width,
}) => {
  const { color, name = "" } = item;
  return (
    <>
      <View
        style={{
          ...css.wrapper,
          width: width - 20,
        }}>
        <View
          style={{
            ...css.category,
            backgroundColor: color,
          }}>
          <Input
            container={{ style: css.inputBox }}
            style={css.input}
            defaultValue={name}
            handleOk={(v) => (item.name = v)}
            onChangeText={(v) => (item.name = v)}
          />

          <Button
            style={css.move}
            onPressIn={onDragStart}
            onPressOut={onDragEnd}>
            <Icon icon="swap" style={css.moveIcon} />
          </Button>
        </View>
      </View>
    </>
  );
};

const css = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
  },
  category: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    paddingRight: 10,

    flexDirection: "row",
    alignItems: "center",

    gap: 10,
    width: "100%",
    borderRadius: 10,
  },
  inputBox: {
    flex: 1,
  },
  input: {
    textAlign: "center",
    fontSize: 18
  },
  move: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  moveIcon: {
    color: "white",
  },
});
