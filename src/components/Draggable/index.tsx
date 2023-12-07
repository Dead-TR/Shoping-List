import React, { FC } from "react";

import DragList, { DragListRenderItemInfo } from "react-native-draglist";

interface Props<Data> {
  data: Data[];
  keyExtractor: (item: Data) => string;
  onReordered: (oldIndex: number, newIndex: number) => void;
  renderItem: (data: DragListRenderItemInfo<Data>) => React.JSX.Element;

  onDragEnd?: () => void;
  onDragBegin?: () => void;
}

export const Draggable = <Data extends any>({
  data,
  renderItem,
  onReordered,
  keyExtractor,

  onDragBegin,
  onDragEnd,
}: Props<Data>) => {
  return (
    <DragList
      data={data}
      renderItem={renderItem}
      onReordered={onReordered}
      keyExtractor={keyExtractor}
      onDragBegin={onDragBegin}
      onDragEnd={onDragEnd}
    />
  );
};
