import * as joi from 'joi';

const signupPattern = joi.object().keys({
  email: joi.string().email().required(),
  userName: joi
    .string()
    .regex(/^[a-zA-Z0-9가-힣_]{1,20}$/)
    .required(),
  password: joi
    .string()
    .min(4)
    .max(16)
    .regex(/^[a-zA-Z0-9]{2,20}$/)
    .required(),
  profileImage: joi.string().allow(''),
});

const loginPattern = joi.object().keys({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(4)
    .max(16)
    .regex(/^[a-zA-Z0-9]{2,20}$/)
    .required(),
});

const namePattern = joi
  .string()
  .regex(/^[a-zA-Z0-9가-힣_]{1,20}$/)
  .required();

export { signupPattern, loginPattern, namePattern };
