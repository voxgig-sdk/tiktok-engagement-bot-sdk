-- TiktokEngagementBot SDK error

local TiktokEngagementBotError = {}
TiktokEngagementBotError.__index = TiktokEngagementBotError


function TiktokEngagementBotError.new(code, msg, ctx)
  local self = setmetatable({}, TiktokEngagementBotError)
  self.is_sdk_error = true
  self.sdk = "TiktokEngagementBot"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TiktokEngagementBotError:error()
  return self.msg
end


function TiktokEngagementBotError:__tostring()
  return self.msg
end


return TiktokEngagementBotError
