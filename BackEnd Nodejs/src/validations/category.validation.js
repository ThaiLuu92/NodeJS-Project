
import Joi from 'joi';
import { ValidationException } from '../expeiptions/index.js';

export const validateCategory = (req, res, next) => {
  const errorMessage = new ValidationException()
  const schema = Joi.object({
    name: Joi.string().max(20).error(() => {
      errorMessage.field.msgName = 'Tên không được quá 20 ký tự'
        return errorMessage
    }),
    name: Joi.string().required().error(() => {
      errorMessage.field.msgName = 'Tên không được để trống'
        return errorMessage
    }),
    description: Joi.string().max(2000).error(() => {
      errorMessage.field.msgDes = 'Mô tả không được 2000 ký tự'
      return errorMessage
    }),
    description: Joi.string().required().error(() => {
      errorMessage.field.msgDes = 'Mô tả không được để trống'
      return errorMessage
    }),
    status: Joi.boolean().required().error(() => {
      errorMessage.field.msgSta = 'Mô tả không được để trống'
      return errorMessage
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    next(errorMessage) ;
  } else {
    next();
  }
};



