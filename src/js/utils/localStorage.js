export const storeObj = (key, value) => {
  return window.localStorage.setItem(`${key}`, JSON.stringify(value));
};

export const getObj = (key) => {
  return JSON.parse(window.localStorage.getItem(`${key}`));
};

export const removeObj = (key) => {
  window.localStorage.removeItem(`${key}`);
};
