# TiktokEngagementBot SDK utility: feature_add
module TiktokEngagementBotUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
