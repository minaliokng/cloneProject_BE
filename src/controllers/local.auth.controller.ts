import { RequestHandler } from 'express';
import { badRequest } from '@hapi/boom';
import LocalAuthService from '../services/local.auth.service';

class LocalAuthController {
  localAuthService: LocalAuthService;

  constructor() {
    this.localAuthService = new LocalAuthService();
  }

  localSignup: RequestHandler = async (req, res, next) => {
    try {
      if (req.file) {
        const { location: profileImage } = req.file as Express.MulterS3.File;
        await this.localAuthService.localSignup(req.body, profileImage);
      } else await this.localAuthService.localSignup(req.body);

      res.status(201).json({ message: '가입 완료' });
    } catch (err) {
      next(err);
    }
  };

  emailCheck: RequestHandler = async (req, res, next) => {
    try {
      const already = await this.localAuthService.emailCheck(req.body.email);

      if (already) res.status(400).json({ errorMessage: '사용 중인 이메일' });
      else res.status(200).json({ message: '사용 가능' });
    } catch (err) {
      next(err);
    }
  };

  login: RequestHandler = async (req, res, next) => {
    try {
      const { userId, userName, profileImage, token } = await this.localAuthService.login(req.body);

      res.status(200).json({
        userId,
        userName,
        profileImage,
        token,
      });
    } catch (err) {
      next(err);
    }
  };

  getUserDetail: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { email, userName, profileImage } = await this.localAuthService.getUserDetail(userId);

      res.status(200).json({ email, userName, profileImage });
    } catch (err) {
      next(err);
    }
  };

  updateUserName: RequestHandler = async (req, res, next) => {
    try {
      const newName = await this.localAuthService.updateUserName(req.body);
      res.status(200).json({ message: '수정 완료', userName: newName });
    } catch (err) {
      next(err);
    }
  };

  updateImage: RequestHandler = async (req, res, next) => {
    try {
      console.log(req.file);
      if (req.file) {
        const { location: profileImage } = req.file as Express.MulterS3.File;
        await this.localAuthService.updateImage(req.body.userId, profileImage);

        res.status(200).json({ message: '수정 완료', profileImage });
      } else throw badRequest('이미지 없음');
    } catch (err) {
      next(err);
    }
  };
}

export default LocalAuthController;
