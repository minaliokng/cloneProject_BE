const AuthRepository = require('../repositories/auth.repository');

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }
}

module.exports = AuthService;
