# TiktokEngagementBot SDK utility: prepare_body
require_relative 'media'
module TiktokEngagementBotUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TiktokEngagementBotUtilities.raw_body(ctx.reqdata) if TiktokEngagementBotUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
