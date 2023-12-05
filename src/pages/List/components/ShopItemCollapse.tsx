import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Collapse } from "../../../components/Collapse";
import { ColorType } from "../../../providers/Categories/type";
import { ShopElement } from "../../../providers/ShopList/type";
import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { createTimeouts } from "../../../utils";
import { COLLAPSE_DEFAULT_DURATION } from "../../../components/Collapse/config";
import { useModal } from "../../../providers/Modal/hook";
import { useShopList } from "../../../providers/ShopList/hook";

interface Props {
  categoryName: string;
  color: ColorType;
  list: ShopElement[];
}

const { clearTimeouts, pushTimeout } = createTimeouts();

export const ShopItemCollapse: FC<Props> = ({ categoryName, color, list }) => {
  const { state, setModal } = useModal();
  const { complete } = useShopList();

  const [isOpen, setIsOpen] = useState(false);
  const prevValue = useRef(isOpen);
  const [isBorder, setIsBorder] = useState(false);

  useEffect(() => {
    clearTimeouts();

    if (isOpen && !prevValue.current) {
      setIsBorder(true);
    } else if (!isOpen && prevValue.current) {
      pushTimeout(() => {
        setIsBorder(false);
      }, COLLAPSE_DEFAULT_DURATION);
    }

    prevValue.current = isOpen;

    return () => {
      clearTimeouts();
    };
  }, [isOpen]);

  return (
    <Collapse
      isOpen={isOpen}
      onOpen={(is) => setIsOpen(is)}
      header={
        <View style={{ ...css.header, ...(!isBorder ? css.closed : {}) }}>
          <Icon
            style={{
              //@ts-ignore
              color,
            }}
            icon="arrow"
          />

          <Text numberOfLines={1}>{categoryName}</Text>
        </View>
      }>
      <View style={{ ...css.content, ...css.closed }}>
        <View style={css.container}>
          {list.map(({ id, isComplete, text }) => (
            <Fragment key={"" + id + text + categoryName}>
              <Button
                style={{
                  maxWidth: "100%",
                  opacity: isComplete ? 0.5 : 1
                }}
                onPress={() => complete(id)}
                onLongPress={() => {
                  state.setState({
                    type: "edit",
                    element: {
                      id,
                      color,
                      text,
                    },
                  });
                  setModal("addNote");
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...css.text,
                    backgroundColor: color,

                    ...(isComplete
                      ? {
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid",
                        }
                      : {}),
                  }}>
                  {text}
                </Text>
              </Button>
            </Fragment>
          ))}
        </View>
      </View>
    </Collapse>
  );
};

const radius = 10;

const css = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    padding: 10,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  closed: {
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  },

  content: {
    padding: 10,
    backgroundColor: "#D9D9D9",

    borderTopColor: "black",
    borderStyle: "solid",
    borderTopWidth: 1,

    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  text: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
