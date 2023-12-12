import { FC, Fragment, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ShopItemCollapse } from "./components/ShopItemCollapse";
import { useCategories } from "../../providers/Categories/hook";
import { useShopList } from "../../providers/ShopList/hook";
import { PageLayout } from "../../components/PageLayout";
import { Confirm } from "../../components/ConfirmModal";
import { useModal } from "../../providers/Modal/hook";
import { Text } from "../../components/Text";

interface Props {
  children?: React.ReactNode;
}

export const List: FC<Props> = ({}) => {
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const { setModal } = useModal();
  const { categories } = useCategories();
  const { list, clear: clearList } = useShopList();

  const sortedList = useMemo(() => {
    return categories.map(({ name, color, defaultOpened }) => ({
      name,
      color,
      items: list[color],
      defaultOpened,
    }));
  }, [categories, list]);

  const clear = () => {
    Object.keys(list).forEach((color) => clearList(color));
  };

  return (
    <>
      <PageLayout
        header={<Text type="big">{"Список Покупок".toUpperCase()}</Text>}
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
  },
});
