/**
 * ExpressError class
 * @param {string} message - The error message
 * @param {number} statusCode - The HTTP status code
 * @param {object} data - The data to send in the response
 */
export default class ExpressError extends Error {
  statusCode = 200;
  isOperational = false;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
