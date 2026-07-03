package = "voxgig-sdk-tiktok-engagement-bot"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/tiktok-engagement-bot-sdk.git",
  tag = "lua/v0.0.1",
  dir = "tiktok-engagement-bot-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the TikTok Engagement Bot public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/tiktok-engagement-bot-sdk",
  issues_url = "https://github.com/voxgig-sdk/tiktok-engagement-bot-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "tiktok-engagement-bot" }
}
dependencies = {
  "lua >= 5.3",
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
