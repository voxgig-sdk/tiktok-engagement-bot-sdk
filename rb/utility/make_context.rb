# TiktokEngagementBot SDK utility: make_context
require_relative '../core/context'
module TiktokEngagementBotUtilities
  MakeContext = ->(ctxmap, basectx) {
    TiktokEngagementBotContext.new(ctxmap, basectx)
  }
end
