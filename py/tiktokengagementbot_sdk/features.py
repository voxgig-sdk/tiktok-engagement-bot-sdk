# TiktokEngagementBot SDK feature factory

from tiktokengagementbot_sdk.feature.base_feature import TiktokEngagementBotBaseFeature
from tiktokengagementbot_sdk.feature.test_feature import TiktokEngagementBotTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TiktokEngagementBotBaseFeature(),
        "test": lambda: TiktokEngagementBotTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
