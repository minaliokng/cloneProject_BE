import Joi from 'joi';

export const createCommentSchema = {
  input: {
    params: Joi.object()
      .keys({
        postId: Joi.number().min(1).required().description('게시글의 UID'),
      })
      .required(),
    body: Joi.object()
      .keys({
        content: Joi.string().max(191).required().description('댓글의 내용'),
      })
      .required(),
  },
};

export const getCommentsSchema = {
  input: {
    params: Joi.object()
      .keys({
        postId: Joi.number().min(1).required().description('게시글의 UID'),
      })
      .required(),
  },
  output: {
    body: Joi.array().items({
      commentId: Joi.number().min(1).required().description('댓글의 UID'),
      content: Joi.string().max(191).required().description('댓글의 내용'),
      createdAt: Joi.date().required().description('댓글의 작성 일자'),
      user: Joi.object().keys({
        userId: Joi.number().min(1).required().description('유저의 UID'),
        profileImage: Joi.string().uri().allow(null).description('유저의 프로필 사진'),
        userName: Joi.string().required().description('유저의 이름'),
      }),
    }),
  },
};

export const updateCommentSchema = {
  input: {
    params: Joi.object()
      .keys({
        commentId: Joi.number().min(1).required().description('댓글의 UID'),
      })
      .required(),
    body: Joi.object()
      .keys({
        content: Joi.string().max(191).required().description('댓글의 내용'),
      })
      .required(),
  },
};

export const deleteCommentSchema = {
  input: {
    params: Joi.object()
      .keys({
        commentId: Joi.number().min(1).required().description('댓글의 UID'),
      })
      .required(),
  },
};
