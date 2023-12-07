export const moveArrayTo = <Arr>(
  array: Arr[],
  oldIndex: number,
  newIndex: number,
) => {
  const newArray = [...array];
  const [removed] = newArray.splice(oldIndex, 1);
  newArray.splice(newIndex, 0, removed);
  return newArray;
};
