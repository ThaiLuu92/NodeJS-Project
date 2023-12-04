import Joi from 'joi';
import { ValidationException } from '../expeiptions/index.js';

export const validateLogin = (req, res, next) => {

  const errorMessage = new ValidationException()
  const schema = Joi.object({
    email: Joi.string().email().required().error(() => {
      errorMessage.field.msgEmail = 'Email không được để trống'
      return errorMessage
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }).error(() => {
      errorMessage.field.msgEmail = 'Email không đúng định dạng'
      return errorMessage
    }),
    password: Joi.string().required().error(() => {
      errorMessage.field.msgPassword = 'Mật khẩu không được để trống'
      return errorMessage
    }),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {

    throw errorMessage;;
  } else {
    next();
  }
};

export const validateConfirmEmail = (req, res, next) => {
  const errorMessage = new ValidationException()
  const schema = Joi.object({
    email: Joi.string().email().required().error(() => {
      errorMessage.field.msgEmail = 'Email không được để trống hoặc Email không đúng định dạng '
      return errorMessage
    }),

  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {

    throw errorMessage;;
  } else {
    next();
  }
};

export const validateResetPassword = (req, res, next) => {
  const errorMessage = new ValidationException()
  const schema = Joi.object({
    email: Joi.string().email().required().error(() => {
      errorMessage.field.msgEmail = 'Email không được để trống hoặc Email không đúng định dạng '
      return errorMessage
    }),

    codeResetPassword: Joi.string().required().error(() => {
      errorMessage.field.msgCode = 'Mã xác nhận không được để trống'
      return errorMessage
    }),

    newPassword: Joi.string().required().error(() => {
      errorMessage.field.msgNewPassword = 'Mã xác nhận không được để trống'
      return errorMessage
    }),

    confirmPassword: Joi.string().required().error(() => {
      errorMessage.field.msgNewPassword = 'Mã xác nhận không được để trống'
      return errorMessage
    }),

  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {

    throw errorMessage;;
  } else {
    next();
  }
};