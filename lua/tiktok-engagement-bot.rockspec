package = "voxgig-sdk-tiktok-engagement-bot"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/tiktok-engagement-bot-sdk.git"
}
description = {
  summary = "TiktokEngagementBot SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["tiktok-engagement-bot_sdk"] = "tiktok-engagement-bot_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
