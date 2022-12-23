// 상태 코드를 에러 객체에 담기 위한 커스텀 에러 클래스
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message || '알 수 없는 에러'); // 부모 생성자 호출
    this.statusCode = statusCode || 500; // 상태 코드 저장
  }
}

module.exports = { ApiError };
