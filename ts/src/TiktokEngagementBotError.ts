
import { Context } from './Context'


class TiktokEngagementBotError extends Error {

  isTiktokEngagementBotError = true

  sdk = 'TiktokEngagementBot'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TiktokEngagementBotError
}

