# TiktokEngagementBot SDK feature factory

from feature.base_feature import TiktokEngagementBotBaseFeature
from feature.test_feature import TiktokEngagementBotTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TiktokEngagementBotBaseFeature(),
        "test": lambda: TiktokEngagementBotTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
