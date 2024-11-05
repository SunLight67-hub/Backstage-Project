class AppException extends Error {
    constructor(code, errorCode, message) {
      super(message);
      this.message = message;
      this.errorCode = errorCode;
      this.status = code;
    }

    toString() {
      return this.message;
    }

    toJSON() {
      return {
        message: this.message,
        status: this.status,
        errorCode: this.errorCode,
      };
    }
  }

  module.exports = AppException;
