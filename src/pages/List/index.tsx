import { FC, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";

import { ShopItemCollapse } from "./components/ShopItemCollapse";
import { useCategories } from "../../providers/Categories/hook";
import { useShopList } from "../../providers/ShopList/hook";
import { PageLayout } from "../../components/PageLayout";
import { Confirm } from "../../components/ConfirmModal";
import { useModal } from "../../providers/Modal/hook";
import { Text } from "../../components/Text";
import { ShopElement } from "../../providers/ShopList/type";

import Loader from "./Loader";

interface Props {
  children?: React.ReactNode;
}

interface SortedContentElement {
  name: string;
  color: string;
  items: ShopElement[];
  defaultOpened: boolean;
}

export const List: FC<Props> = ({}) => {
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [sortedList, setSortedList] = useState<SortedContentElement[]>([]);

  const { setModal } = useModal();
  const { categories, isSync: categoriesSync } = useCategories();
  const { list, clear: clearList, isSync: shopSync } = useShopList();

  const animation = useRef(new Animated.Value(0)).current;

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const play = categoriesSync || shopSync;

  useEffect(() => {
    const start = () => {
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 1000,
      }).start();
    };
    if (play) {
      animation.resetAnimation();
      animation.setValue(0);
      start();

      animation.addListener(({ value }) => {
        if (value === 1) {
          animation.setValue(0);
          start();
        }
      });
    } else {
      animation.stopAnimation();
    }
  }, [categoriesSync, shopSync]);

  useEffect(() => {
    const updatedList = categories.map(({ name, color, defaultOpened }) => ({
      name,
      color,
      items: list[color]?.list || [],
      defaultOpened,
    }));

    setSortedList(updatedList);
  }, [categories, list]);

  const clear = () => {
    Object.keys(list).forEach((color) => clearList(color));
  };

  console.log(play, categoriesSync, shopSync);

  return (
    <>
      <PageLayout
        header={
          <View style={css.header}>
            {play && (
              <Animated.View style={{ ...css.loader, transform: [{ rotate }] }}>
                <Loader />
              </Animated.View>
            )}

            <Text style={css.title} type="big">
              {"Список Покупок".toUpperCase()}
            </Text>
          </View>
        }
        footer={[
          { icon: "pen", onPress: () => setModal("editCategory") },
          { icon: "trash", onPress: () => setIsDeleteConfirm(true) },
          { icon: "add", onPress: () => setModal("addNote") },
        ]}>
        <View style={css.container}>
          {sortedList.map((category, i) => {
            const { color, items, name, defaultOpened } = category;
            if (!items || !items?.length) return null;
            return (
              <Fragment key={color + "_" + i}>
                <ShopItemCollapse
                  color={color}
                  categoryName={name}
                  list={items}
                  defaultOpened={defaultOpened}
                  disableDefaultOpen={() => (category.defaultOpened = false)}
                />
              </Fragment>
            );
          })}
        </View>

        <Confirm
          onOk={clear}
          isOpen={isDeleteConfirm}
          onClose={() => setIsDeleteConfirm(false)}>
          {`Видалити усе?`.toUpperCase()}
        </Confirm>
      </PageLayout>
    </>
  );
};

const css = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
  },
  loader: {
    color: "white",
    position: "absolute",
    right: 20,
    top: "-100%",
  },
});
