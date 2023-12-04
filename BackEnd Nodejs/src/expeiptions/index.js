class BadRequestException extends Error {
    name = "BadRequestException";
    constructor(message, statusCode = 400, field = null) {
      super(message);
      this.statusCode = statusCode;
      this.field = field;
    }
  }
  
  class AuthencationException extends Error {
    name = "AuthencationException";
    constructor(message, statusCode = 401, field = null) {
      super(message);
      this.statusCode = statusCode;
      this.field = field;
    }
  }
  
  class ServerException extends Error {
    name = "ServerException";
    constructor(message, statusCode = 500, field = null) {
      super(message);
      this.statusCode = statusCode;
      this.field = field;
    }
  }
  
  class ValidationException extends Error {
    name = "ValidationException";
    constructor(message, statusCode = 400, field = {}) {
      super(message);
      this.statusCode = statusCode;
      this.field = field;
    }
  }
  
  export {
    BadRequestException,
    AuthencationException,
    ServerException,
    ValidationException,
  };