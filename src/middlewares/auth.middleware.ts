import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

// 로그인 필요한 경우
// const requireLogin = async (req: Request, res: Response, next) => {
//   const { login } = req.body;
//   const { authorization } = req.headers;

//   try {
//     if(!authorization) throw err;
//   } catch (err) {
//     res.status(200).
//   };
// }

// export default { requireLogin };
