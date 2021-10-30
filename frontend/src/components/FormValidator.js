const minLength = (value, min) => value.trim().length >= min;
const maxLength = (value, max) => value.trim().length <= max;
const isEmail = (email) => /^[^@]+@[a-z]+(\.[a-z]+)+$/.test(email.trim());
const notSpaces = (password) => /^\S+$/.test(password.trim());
const isFilled = (value) => value.trim() !== '';

export {
  minLength,
  maxLength,
  isEmail,
  notSpaces,
  isFilled,
};
