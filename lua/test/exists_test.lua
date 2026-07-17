-- TiktokEngagementBot SDK exists test

local sdk = require("tiktok-engagement-bot_sdk")

describe("TiktokEngagementBotSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
