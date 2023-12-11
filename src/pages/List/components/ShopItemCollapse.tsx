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
import { Modal } from "../../../components/Modal";
import { ButtonsMenu } from "../../../components/ButtonsMenu";
import { Confirm } from "../../../components/ConfirmModal";

interface Props {
  categoryName: string;
  color: ColorType;
  list: ShopElement[];
}

const { clearTimeouts, pushTimeout } = createTimeouts();

export const ShopItemCollapse: FC<Props> = ({ categoryName, color, list }) => {
  const { state, setModal } = useModal();
  const { complete, updateList } = useShopList();

  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

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

  const onOk = () => {
    const isComplete = !list.find(({ isComplete }) => !isComplete);

    if (isComplete) {
      list.forEach((e) => (e.isComplete = false));
    } else {
      list.forEach((e) => (e.isComplete = true));
    }

    updateList();
  };

  const rm = () => {
    list.length = 0;
    updateList();
  };

  return (
    <>
      <Collapse
        isOpen={isOpen}
        onOpen={(is) => setIsOpen(is)}
        header={
          <View style={{ ...css.header, ...(!isBorder ? css.closed : {}) }}>
            <View style={{ ...css.headerElement, ...css.categoryName }}>
              <Icon
                style={{
                  ...css.headerIcon,
                  //@ts-ignore
                  color,
                  transform: [
                    {
                      rotate: isOpen ? "180deg" : "0deg",
                    },
                  ],
                }}
                icon="arrow"
              />
              <Text numberOfLines={1}>{categoryName}</Text>
            </View>

            <View style={css.headerElement}>
              <Button style={css.headerButton} onPress={onOk}>
                <Icon icon="ok" style={css.headerIcon} />
              </Button>
              <Button style={css.headerButton} onPress={() => setIsModal(true)}>
                <Icon icon="trash" style={css.headerIcon} />
              </Button>
            </View>
          </View>
        }>
        <View style={{ ...css.content, ...css.closed }}>
          <View style={css.container}>
            {list.map(({ id, isComplete, text }) => (
              <Fragment key={"" + id + text + categoryName}>
                <Button
                  style={{
                    maxWidth: "100%",
                    opacity: isComplete ? 0.5 : 1,
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

      <Confirm isOpen={isModal} onClose={() => setIsModal(false)} onOk={rm}>
        {`Дійсно видалити?`.toUpperCase()}
      </Confirm>
    </>
  );
};

const radius = 10;

const css = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,

    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  headerIcon: {
    minWidth: 20,
    minHeight: 20,
    maxWidth: 20,
    maxHeight: 20,
    color: "#000000",
  },
  headerButton: {
    padding: 5,
  },
  closed: {
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
  },
  headerElement: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryName: {
    maxWidth: "70%",
    paddingVertical: 10,
    gap: 10,
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
