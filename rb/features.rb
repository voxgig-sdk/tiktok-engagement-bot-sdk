# TiktokEngagementBot SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TiktokEngagementBotFeatures
  def self.make_feature(name)
    case name
    when "base"
      TiktokEngagementBotBaseFeature.new
    when "test"
      TiktokEngagementBotTestFeature.new
    else
      TiktokEngagementBotBaseFeature.new
    end
  end
end
