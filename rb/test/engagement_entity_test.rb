# Engagement entity test

require "minitest/autorun"
require "json"
require_relative "../TiktokEngagementBot_sdk"
require_relative "runner"

class EngagementEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = TiktokEngagementBotSDK.test(nil, nil)
    ent = testsdk.Engagement(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = TiktokEngagementBotConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = TiktokEngagementBotSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Engagement(nil).create({ "action" => 1, "url" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = engagement_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "engagement." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    engagement_ref01_ent = client.Engagement(nil)
    engagement_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.engagement"), "engagement_ref01"))

    engagement_ref01_data_result = engagement_ref01_ent.create(engagement_ref01_data, nil)
    engagement_ref01_data = Helpers.to_map(engagement_ref01_data_result.respond_to?(:data_get) ? engagement_ref01_data_result.data_get : engagement_ref01_data_result)
    assert !engagement_ref01_data.nil?

  end
end

def engagement_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "engagement", "EngagementTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TiktokEngagementBotSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["engagement01", "engagement02", "engagement03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID" => idmap,
    "TIKTOK_ENGAGEMENT_BOT_TEST_LIVE" => "FALSE",
    "TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN" => "FALSE",
    "TIKTOK_ENGAGEMENT_BOT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TIKTOK_ENGAGEMENT_BOT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["TIKTOK_ENGAGEMENT_BOT_APIKEY"],
      },
      extra || {},
    ])
    client = TiktokEngagementBotSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TIKTOK_ENGAGEMENT_BOT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
