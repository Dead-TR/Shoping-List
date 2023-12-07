import { FC, Fragment, useMemo, useState } from "react";
import { Appearance, ScrollView, StyleSheet, View } from "react-native";
import { PageLayout } from "../../components/PageLayout";
import { Text } from "../../components/Text";
import { useModal } from "../../providers/Modal/hook";
import { useShopList } from "../../providers/ShopList/hook";
import { ShopItemCollapse } from "./components/ShopItemCollapse";
import { useCategories } from "../../providers/Categories/hook";
import { ColorType } from "../../providers/Categories/type";

interface Props {
  children?: React.ReactNode;
}

export const List: FC<Props> = ({}) => {
  const { setModal } = useModal();
  const { categories } = useCategories();
  const { list } = useShopList();

  const sortedList = useMemo(() => {
    return categories.map(({ name, color }) => ({
      name,
      color,
      items: list[color],
    }));
  }, [categories, list]);

  return (
    <PageLayout
      header={<Text type="big">{"Список Покупок".toUpperCase()}</Text>}
      footer={[
        { icon: "pen", onPress: () => setModal("editCategory") },
        { icon: "trash", onPress: () => {} },
        { icon: "add", onPress: () => setModal("addNote") },
      ]}>
      <View style={css.container}>
        {sortedList.map(({ color, items, name }, i) => {
          if (!items || !items?.length) return null;
          return (
            <Fragment key={color + "_" + i}>
              <ShopItemCollapse
                color={color}
                categoryName={name}
                list={items}
              />
            </Fragment>
          );
        })}
      </View>
    </PageLayout>
  );
};

const css = StyleSheet.create({
  container: {
    gap: 10,
  },
});
