import joi from 'joi';

export const signUpSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  confirm_password: joi.string().valid(joi.ref('password')).trim().required()
});

export const signInSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required()
});
