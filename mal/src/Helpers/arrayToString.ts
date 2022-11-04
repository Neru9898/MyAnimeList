export const arrayToString = (array: any) => {
  let newString = "";
  array.map(
    (genre: any) => (newString += `${genre.name ? genre.name : genre}, `)
  );
  return newString;
};
