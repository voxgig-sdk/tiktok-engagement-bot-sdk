# TiktokEngagementBot SDK exists test

import pytest
from tiktokengagementbot_sdk import TiktokEngagementBotSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TiktokEngagementBotSDK.test(None, None)
        assert testsdk is not None
