import { RequestHandler } from 'express';
import { unauthorized } from '@hapi/boom';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env as { JWT_SECRET_KEY: string };

const requireLogin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw unauthorized('로그인 정보 없음');
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType === 'Bearer' && tokenValue) {
      const payload: any = jwt.verify(tokenValue, JWT_SECRET_KEY);

      res.locals.userId = payload.userId;
    }
    next();
  } catch (err) {
    next(unauthorized('로그인 정보 없음'));
  }
};

const requireNoLogin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (authorization) {
      const [tokenType, tokenValue] = authorization.split(' ');

      if (tokenType === 'Bearer' && tokenValue) {
        jwt.verify(tokenValue, JWT_SECRET_KEY);
        next(unauthorized('로그인 정보가 이미 있음'));
      }
    } else next();
  } catch (err) {
    next();
  }
};

const passAnyway: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (authorization) {
      const [tokenType, tokenValue] = authorization.split(' ');

      if (tokenType === 'Bearer' && tokenValue) {
        const payload: any = jwt.verify(tokenValue, JWT_SECRET_KEY);

        res.locals.userId = payload.userId;
      }
    }
    next();
  } catch (err) {
    next();
  }
};

export { requireLogin, requireNoLogin, passAnyway };
