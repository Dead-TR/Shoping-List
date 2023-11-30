import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, StyleProp, ViewStyle } from "react-native";

import { Button } from "../Button";
import { createTimeouts } from "../../utils";
import { COLLAPSE_DEFAULT_DURATION } from "./config";

interface Props {
  children?: React.ReactNode;
  header: React.ReactNode;

  isOpen: boolean;
  onOpen: (v: boolean) => void;

  duration?: number;

  styles?: {
    container?: StyleProp<ViewStyle>;
  };
}

export const Collapse: FC<Props> = ({
  children,
  header,
  isOpen,
  onOpen,
  duration = COLLAPSE_DEFAULT_DURATION,
  styles,
}) => {
  const contentRef = useRef<View>(null);
  const rootRef = useRef<View>(null);
  const { clearTimeouts, pushTimeout } = useRef(createTimeouts()).current;
  const animationRef = useRef(new Animated.Value(isOpen ? 1 : 0));

  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isOpen) setMaxHeight(undefined);
    requestAnimationFrame(() => {
      Animated.timing(animationRef.current, {
        toValue: isOpen ? 1 : 0,
        useNativeDriver: false,
        duration,
      }).start();
    });

    if (!isOpen) {
      pushTimeout(() => {
        rootRef.current?.measure((x, y, w, h) => {
          setMaxHeight(Math.ceil(h));
        });
      }, duration);
    }

    return () => {
      clearTimeouts();
    };
  }, [isOpen]);

  const contentHeight = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={{ ...css.container, ...(styles?.container as object), maxHeight }}
      collapsable={false}
      ref={rootRef}>
      <Button onPress={() => onOpen(!isOpen)} style={css.header}>
        {header}
      </Button>

      <Animated.View
        style={{
          maxHeight: contentHeight,
          overflow: "hidden",
        }}>
        <View style={css.content} ref={contentRef}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const css = StyleSheet.create({
  container: {},
  header: {},
  content: {},
});
