export const arrayToString = (array: any) => {
  let newString = "";
  array.map((genre: any) => (newString += `${genre}, `));
  return newString;
};
