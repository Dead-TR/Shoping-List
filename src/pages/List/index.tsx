import { FC } from "react";
import {} from "react-native";
import { PageLayout } from "../../components/PageLayout";
import { Text } from "../../components/Text";

interface Props {
  children?: React.ReactNode;
}
export const List: FC<Props> = ({}) => {
  return (
    <PageLayout
      header={<Text type="big">{"Список Покупок".toUpperCase()}</Text>}
      footer={<Text style={{ backgroundColor: "red" }}>FOOTER</Text>}>
      {/* <Text
        style={{
          height: 1800,
          backgroundColor: "purple",
        }}>
        LIST PAGE
      </Text> */}
    </PageLayout>
  );
};
