import joi from 'joi';

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirm_password: joi.equal(joi.ref('password')).required()
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});
