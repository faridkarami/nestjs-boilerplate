export const typeCast = <T>(obj, type) => {
  const typeInstance = new type();

  const result = {};
  Object.entries(typeInstance).map(([typeKey]) => {
    result[typeKey] = obj[typeKey];
  });
  return <T>result;
};
