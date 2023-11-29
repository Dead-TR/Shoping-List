import { FC, useState } from "react";
import {} from "react-native";
import { PageLayout } from "../../components/PageLayout";
import { Text } from "../../components/Text";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useModal } from "../../providers/Modal/hook";

interface Props {
  children?: React.ReactNode;
}

export const List: FC<Props> = ({}) => {
  const { modalName, setModal } = useModal();

  return (
    <PageLayout
      header={<Text type="big">{"Список Покупок".toUpperCase()}</Text>}
      footer={[
        { icon: "pen", onPress: () => setModal("editCategory") },
        { icon: "trash", onPress: () => {} },
        { icon: "add", onPress: () => setModal("addNote") },
      ]}></PageLayout>
  );
};
