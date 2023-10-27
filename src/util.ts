export function compareArrays<Type>(
  first: Array<Type>,
  second: Array<Type>,
): boolean {
  // if the both arrays are falsy values, they are the same
  if (!first && !second) return true;

  // if only one array is a falsy value, return
  if (!first || !second) return false;

  // if the argument is the same array, we can be sure the contents are same as well
  if (first === second) return true;

  // compare lengths - can save a lot of time
  if (first.length != second.length) return false;

  for (let i = 0, l = first.length; i < l; i++)
    // Warning - two different object instances will never be equal: {x:20} != {x:20}
    if (first[i] != second[i]) return false;

  return true;
}
