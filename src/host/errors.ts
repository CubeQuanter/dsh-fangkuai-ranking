/** 用户可读的业务错误；HTTP 层统一映射状态码，绝不把原始异常抛给界面。 */
export class AppError extends Error {
  readonly code: string
  readonly status: number

  constructor(code: string, message: string, status = 400) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status
  }
}

export class MissingKeyError extends AppError {
  constructor() {
    super('missing_key', '还没有配置扶摇访问密钥，请先在设置中完成连接', 401)
    this.name = 'MissingKeyError'
  }
}

export class KeyInvalidError extends AppError {
  constructor() {
    super('invalid_key', '访问密钥无效或已过期，请重新填写', 401)
    this.name = 'KeyInvalidError'
  }
}

export class DataUnavailableError extends AppError {
  constructor(message: string, code = 'data_unavailable') {
    super(code, message, 503)
    this.name = 'DataUnavailableError'
  }
}
