# TiktokEngagementBot SDK feature factory

from tiktokengagementbot_sdk.feature.base_feature import TiktokEngagementBotBaseFeature
from tiktokengagementbot_sdk.feature.ratelimit_feature import TiktokEngagementBotRatelimitFeature
from tiktokengagementbot_sdk.feature.retry_feature import TiktokEngagementBotRetryFeature
from tiktokengagementbot_sdk.feature.test_feature import TiktokEngagementBotTestFeature
from tiktokengagementbot_sdk.feature.timeout_feature import TiktokEngagementBotTimeoutFeature


_FEATURES = {
    "base": lambda: TiktokEngagementBotBaseFeature(),
    "ratelimit": lambda: TiktokEngagementBotRatelimitFeature(),
    "retry": lambda: TiktokEngagementBotRetryFeature(),
    "test": lambda: TiktokEngagementBotTestFeature(),
    "timeout": lambda: TiktokEngagementBotTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
