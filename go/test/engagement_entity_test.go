package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/tiktok-engagement-bot-sdk/go"
	"github.com/voxgig-sdk/tiktok-engagement-bot-sdk/go/core"

	vs "github.com/voxgig-sdk/tiktok-engagement-bot-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const engagementEntityLiveStrict = true


func TestEngagementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Engagement(nil)
		if ent == nil {
			t.Fatal("expected non-nil EngagementEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Engagement(nil).Create(map[string]any{"action": 1, "url": "x"}, nil)
		if sdkerr, ok := err.(*core.TiktokEngagementBotError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := engagementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "engagement." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// CREATE
		engagementRef01Ent := client.Engagement(nil)
		engagementRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "engagement"}), "engagement_ref01"))

		engagementRef01DataResult, err := engagementRef01Ent.Create(engagementRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		engagementRef01Data = core.ToMapAny(entityData(engagementRef01DataResult))
		if engagementRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func engagementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "engagement", "EngagementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read engagement test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse engagement test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"engagement01", "engagement02", "engagement03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID": idmap,
		"TIKTOK_ENGAGEMENT_BOT_TEST_LIVE":      "FALSE",
		"TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN":   "FALSE",
		"TIKTOK_ENGAGEMENT_BOT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TIKTOK_ENGAGEMENT_BOT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["TIKTOK_ENGAGEMENT_BOT_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewTiktokEngagementBotSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TIKTOK_ENGAGEMENT_BOT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
