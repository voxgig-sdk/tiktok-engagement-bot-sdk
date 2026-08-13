# TiktokEngagementBot SDK utility: make_context

from tiktokengagementbot_sdk.core.context import TiktokEngagementBotContext


def make_context_util(ctxmap, basectx):
    return TiktokEngagementBotContext(ctxmap, basectx)
