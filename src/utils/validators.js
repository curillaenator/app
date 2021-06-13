export const required = (value) => (value ? undefined : "Обязательное поле");

export const minTextLength = (min) => {
  return (val) => {
    return val.length >= min ? undefined : `Не менее ${min} символов`;
  };
};

export const composeValidators =
  (...vdators) =>
  (val) => {
    return vdators.reduce((err, vdator) => err || vdator(val), undefined);
  };
