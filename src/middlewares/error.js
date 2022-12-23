const logger = require('../config/logger');
const { ApiError } = require('../utils/apiError');

// 에러를 로깅해주는 미들웨어
const errorLogger = (err, req, res, next) => {
  const { stack } = err; // err.stack을 바로 넣지 않는 이유는 winston이 메소드에 인자로 들어간 변수를 지 맘대로 바꾸는 것 같아서 그렇습니다
  logger.error(stack); // error 레벨로 로깅
  next(err); // 다음 에러 처리 미들웨어 호출
};

// 응답하기 전에 apiError가 아닌 에러를 apiError로 바꿔주는 미들웨어
const errorConverter = (err, req, res, next) => {
  // ApiError인 경우 그대로 다음 미들웨어 호출
  if (err instanceof ApiError) next(err);
  // joi에서 발생한 유효성 검사 에러인 경우
  else if (err.isJoi) next(new ApiError('요구사항에 맞지 않는 입력값', 400));
  // 그 밖에 잡지 못한 에러
  else next(new ApiError('알 수 없는 오류', 500));
};

// 에러를 응답하는 미들웨어
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ errorMessage: err.message });
};

module.exports = { errorLogger, errorConverter, errorHandler };
