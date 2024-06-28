class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export { BadRequestError, UnauthorizedError, NotFoundError };
