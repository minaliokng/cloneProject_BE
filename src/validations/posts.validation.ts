import * as joi from 'joi';

export const postInputPattern = joi.object().keys({
  title: joi.string().required().description('제목'),
  content: joi.string().required().description('내용'),
  privateOption: joi.number().required().description('비공개여부'),
  postImage: joi.string().description('이미지가 undefind 문자열일 때'),
});

export const postIdPattern = joi.number().integer().required().description('게시글번호');
