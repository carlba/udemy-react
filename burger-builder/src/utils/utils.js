export function convertObjectToArray(obj) {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return [...acc, { ...value, id: key }];
  }, []);
}

export function getTimeDifferenceInSeconds(firstDate, secondDate) {
  return (firstDate.getTime() - secondDate.getTime()) / 1000;
}
