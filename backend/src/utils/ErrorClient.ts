export default class ErrorClient extends Error {
  public statusCode: number;
  public message: string;
  public type: string;

  constructor(statusCode: number, type: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
  }
}
