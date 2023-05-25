function objToArray<T extends { [key: string]: any }>(
  arrayObj: T[] | undefined,
  key: keyof T
): T[keyof T][] {
  if (!arrayObj) return [];

  const newArray: T[keyof T][] = [];

  for (let obj of arrayObj) {
    newArray.push(obj[key]);
  }
  return newArray;
}
export default objToArray;
