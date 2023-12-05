import { FC, Fragment, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PageLayout } from "../../components/PageLayout";
import { Text } from "../../components/Text";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
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

  const categoriesNames = useMemo(() => {
    return categories.reduce((acm, { color, name }) => {
      acm[color] = name || "";
      return acm;
    }, {} as Record<ColorType, string>);
  }, [categories]);

  return (
    <PageLayout
      header={<Text type="big">{"Список Покупок".toUpperCase()}</Text>}
      footer={[
        { icon: "pen", onPress: () => setModal("editCategory") },
        { icon: "trash", onPress: () => {} },
        { icon: "add", onPress: () => setModal("addNote") },
      ]}>
      <View style={css.container}>
        {Object.entries(list).map(([color, list], i) => {
          if (!list.length) return null;
          return (
            <Fragment key={color + "_" + i}>
              <ShopItemCollapse
                color={color}
                categoryName={categoriesNames[color]}
                list={list}
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
