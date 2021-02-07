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

export function checkValidity(value, rules) {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
}
