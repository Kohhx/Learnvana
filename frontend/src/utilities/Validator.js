const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

// Validators used in the validate functions
exports.VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
exports.VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
exports.VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
exports.VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
exports.VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
exports.VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
exports.VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

// Validate Function used to validate, validators is an array
exports.validate = (value, validators) => {
  let errorMessages = [];
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      const typeIsValid = value.trim().length > 0;
      if (!typeIsValid) {
        errorMessages.push("An input is required");
      }
      isValid = isValid && typeIsValid;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      const typeIsValid = value.trim().length >= validator.val;
      if (!typeIsValid) {
        errorMessages.push(
          `Please enter input with minimum length of ${validator.val}`
        );
      }
      isValid = isValid && typeIsValid;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      const typeIsValid = value.trim().length <= validator.val;
      if (!typeIsValid) {
        errorMessages.push(
          `Please enter input with maximum length of ${validator.val}`
        );
      }
      isValid = isValid && typeIsValid;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      const typeIsValid = +value >= validator.val;
      if (!typeIsValid) {
        errorMessages.push(
          `Please enter input value more than or equal to ${validator.val}`
        );
      }
      isValid = isValid && typeIsValid;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      const typeIsValid = +value <= validator.val;
      if (!typeIsValid) {
        errorMessages.push(
          `Please enter input value less than or equal to ${validator.val}`
        );
        isValid = isValid && typeIsValid;
      }
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      const typeIsValid = /^\S+@\S+\.\S+$/.test(value);
      if (!typeIsValid) {
        errorMessages.push(`Please enter valid email`);
      }
      isValid = isValid && typeIsValid;
    }
  }

  return [isValid, errorMessages];
};
