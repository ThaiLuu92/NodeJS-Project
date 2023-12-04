import { ValidationException } from "../expeiptions/index.js";

const validationFormRegister = (req, res, next) => {
  let error = true;
  const errors = {};
  errors.emailMessage = "VUi lòng điền email";
  if (error) {
    const errorValidation = new ValidationException(
      "Validation failed",
      400,
      errors
    );
    next(errorValidation);
  }
};

export { validationFormRegister };