const { createLogger, transports, format } = require('winston');
const { NODE_ENV } = process.env;

// 로깅 레벨
// error: 0
// warn: 1
// info: 2
// http: 3
// verbose: 4
// debug: 5
// silly: 6

const logger = createLogger({
  level: 'info', // 출력할 최소 레벨
  format: format.combine(
    format.timestamp(), // 로그에 타임스탬프 추가
    format.json(), // 로그를 json 형태로 출력
  ),
  // 출력 형식
  transports: [
    // 파일로 출력
    new transports.File({
      dirname: 'logs', // 로그 파일을 저장할 경로
      filename: 'info.log', // 로그 파일의 이름
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error', // 최소 레벨 재정의
    }),
  ],
});

// 개발 환경에서는 콘솔에도 출력하기 위한 로직
if (NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(), // 색 입히기
        // 출력 형식 직접 지정
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}] ${
              message instanceof Object ? JSON.stringify(message) : message
            }`,
        ),
      ),
      level: 'silly',
    }),
  );
}

// morgan을 winston을 통해 출력하기 위한 로직
logger.stream = { write: (message) => logger.http(message) };

module.exports = logger;
