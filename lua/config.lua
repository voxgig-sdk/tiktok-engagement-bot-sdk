-- TiktokEngagementBot SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "TiktokEngagementBot",
      slug = "tiktok-engagement-bot",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://zefoy.com",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["engagement"] = {},
      },
    },
    entity = {
      ["engagement"] = {
        ["fields"] = {
          {
            ["name"] = "action",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Type of engagement requested",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "estimated_completion",
            ["short"] = "Estimated time to complete the request",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "quantity",
            ["short"] = "Number of engagements being processed",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "request_id",
            ["short"] = "Unique identifier for tracking the request",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Target TikTok URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "engagement",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/engagement",
                ["parts"] = {
                  "api",
                  "engagement",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
