import * as joi from 'joi';

export const postInputPattern = joi.object().keys({
  title: joi.string().required().description('제목'),
  content: joi.string().required().description('내용'),
  privateOption: joi.number().required().description('비공개여부'),
});

export const postIdPattern = joi.number().integer().required().description('게시글번호');
