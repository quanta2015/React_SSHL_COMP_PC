// custom error
// @author Pluto <huarse@gmail.com>
// @create 2020/06/01 13:12

export default class CustomError extends Error {
  code = null;

  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
