# TiktokEngagementBot SDK exists test

require "minitest/autorun"
require_relative "../TiktokEngagementBot_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TiktokEngagementBotSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
