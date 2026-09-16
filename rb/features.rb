# TiktokEngagementBot SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TiktokEngagementBotFeatures
  def self.make_feature(name)
    case name
    when "base"
      TiktokEngagementBotBaseFeature.new
    when "ratelimit"
      TiktokEngagementBotRatelimitFeature.new
    when "retry"
      TiktokEngagementBotRetryFeature.new
    when "test"
      TiktokEngagementBotTestFeature.new
    when "timeout"
      TiktokEngagementBotTimeoutFeature.new
    else
      TiktokEngagementBotBaseFeature.new
    end
  end
end
