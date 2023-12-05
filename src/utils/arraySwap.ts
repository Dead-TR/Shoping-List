export const arraySwap = <T>(arr: T[], index1: number, index2: number) => {
  if (
    index1 < 0 ||
    index1 >= arr.length ||
    index2 < 0 ||
    index2 >= arr.length
  ) {
    console.error(
      "Invalid indices. Ensure indices are within the array bounds.",
    );
    return arr;
  }

  // Міняємо місцями елементи за допомогою допоміжної змінної
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;

  return arr;
};
