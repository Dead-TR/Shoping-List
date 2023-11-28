import React, { FC, Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../../config/routes";

interface Props {
}

const Stack = createNativeStackNavigator();

export const Routes: FC<Props> = ({}) => {
  return (
    <>
      <Stack.Navigator initialRouteName={"/"}>
        {Object.entries(routes).map(([name, { component, options }], i) => {
          return (
            <Fragment key={name}>
              <Stack.Screen
                name={name}
                component={component}
                options={{
                  headerShown: false,
                  ...options,
                }}
              />
            </Fragment>
          );
        })}
      </Stack.Navigator>
    </>
  );
};
