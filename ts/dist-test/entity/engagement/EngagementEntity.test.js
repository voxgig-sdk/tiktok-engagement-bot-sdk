"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EngagementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TIKTOK_ENGAGEMENT_BOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TIKTOK_ENGAGEMENT_BOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TiktokEngagementBotSDK.test();
        const ent = testsdk.Engagement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TIKTOK_ENGAGEMENT_BOT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'engagement.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "action", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Type of engagement requested", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "estimated_completion", "req": false, "short": "Estimated time to complete the request", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "quantity", "req": false, "short": "Number of engagements being processed", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "request_id", "req": false, "short": "Unique identifier for tracking the request", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "uri", "name": "url", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Target TikTok URL", "type": "`$STRING`", "index$": 4 }], "name": "engagement", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/engagement", "json": "{\"operationId\":\"boostEngagement\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"followers\":{\"summary\":\"Request followers\",\"value\":{\"action\":\"followers\",\"quantity\":50,\"url\":\"https://www.tiktok.com/@username\"}},\"likes\":{\"summary\":\"Request likes\",\"value\":{\"action\":\"likes\",\"quantity\":100,\"url\":\"https://www.tiktok.com/@username/video/1234567890\"}},\"shares\":{\"summary\":\"Request shares\",\"value\":{\"action\":\"shares\",\"quantity\":25,\"url\":\"https://www.tiktok.com/@username/video/1234567890\"}},\"views\":{\"summary\":\"Request views\",\"value\":{\"action\":\"views\",\"quantity\":1000,\"url\":\"https://www.tiktok.com/@username/video/1234567890\"}}},\"schema\":{\"properties\":{\"action\":{\"description\":\"Type of engagement to boost\",\"enum\":[\"likes\",\"followers\",\"shares\",\"views\"],\"example\":\"likes\",\"type\":\"string\"},\"quantity\":{\"description\":\"Number of engagements to add (optional, defaults to maximum available)\",\"example\":100,\"maximum\":10000,\"minimum\":1,\"type\":\"integer\"},\"url\":{\"description\":\"TikTok profile URL or video URL to boost engagement\",\"example\":\"https://www.tiktok.com/@username/video/1234567890\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\",\"action\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Successful response\",\"value\":{\"data\":{\"action\":\"likes\",\"estimated_completion\":\"2-5 minutes\",\"quantity\":100,\"url\":\"https://www.tiktok.com/@username/video/1234567890\"},\"message\":\"Engagement boost initiated\",\"status\":\"success\"}}},\"schema\":{\"properties\":{\"data\":{\"properties\":{\"action\":{\"description\":\"Type of engagement requested\",\"enum\":[\"likes\",\"followers\",\"shares\",\"views\"],\"example\":\"likes\",\"type\":\"string\"},\"estimated_completion\":{\"description\":\"Estimated time to complete the request\",\"example\":\"2-5 minutes\",\"type\":\"string\"},\"quantity\":{\"description\":\"Number of engagements being processed\",\"example\":100,\"type\":\"integer\"},\"request_id\":{\"description\":\"Unique identifier for tracking the request\",\"example\":\"req_abc123xyz\",\"type\":\"string\"},\"url\":{\"description\":\"Target TikTok URL\",\"example\":\"https://www.tiktok.com/@username/video/1234567890\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"message\":{\"description\":\"Human-readable message about the request\",\"example\":\"Engagement boost initiated\",\"type\":\"string\"},\"status\":{\"description\":\"Status of the engagement request\",\"enum\":[\"success\",\"pending\"],\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Engagement request successfully processed\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_action\":{\"summary\":\"Invalid action type\",\"value\":{\"code\":\"INVALID_ACTION\",\"message\":\"Action must be one of: likes, followers, shares, views\",\"status\":\"error\"}},\"invalid_url\":{\"summary\":\"Invalid TikTok URL\",\"value\":{\"code\":\"INVALID_URL\",\"message\":\"Invalid TikTok URL provided\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Machine-readable error code\",\"example\":\"INVALID_URL\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid TikTok URL provided\",\"type\":\"string\"},\"retry_after\":{\"description\":\"Seconds to wait before retrying (for rate limit errors)\",\"example\":300,\"type\":\"integer\"},\"status\":{\"description\":\"Error status indicator\",\"enum\":[\"error\"],\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"message\",\"code\"],\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"unauthorized\":{\"summary\":\"Missing authentication\",\"value\":{\"code\":\"UNAUTHORIZED\",\"message\":\"Valid session ID is required\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Machine-readable error code\",\"example\":\"INVALID_URL\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid TikTok URL provided\",\"type\":\"string\"},\"retry_after\":{\"description\":\"Seconds to wait before retrying (for rate limit errors)\",\"example\":300,\"type\":\"integer\"},\"status\":{\"description\":\"Error status indicator\",\"enum\":[\"error\"],\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"message\",\"code\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Missing or invalid session ID\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"rate_limit\":{\"summary\":\"Too many requests\",\"value\":{\"code\":\"RATE_LIMIT_EXCEEDED\",\"message\":\"Rate limit exceeded. Please try again later\",\"retry_after\":300,\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Machine-readable error code\",\"example\":\"INVALID_URL\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid TikTok URL provided\",\"type\":\"string\"},\"retry_after\":{\"description\":\"Seconds to wait before retrying (for rate limit errors)\",\"example\":300,\"type\":\"integer\"},\"status\":{\"description\":\"Error status indicator\",\"enum\":[\"error\"],\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"message\",\"code\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"server_error\":{\"summary\":\"Server error\",\"value\":{\"code\":\"INTERNAL_ERROR\",\"message\":\"An internal server error occurred\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Machine-readable error code\",\"example\":\"INVALID_URL\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid TikTok URL provided\",\"type\":\"string\"},\"retry_after\":{\"description\":\"Seconds to wait before retrying (for rate limit errors)\",\"example\":300,\"type\":\"integer\"},\"status\":{\"description\":\"Error status indicator\",\"enum\":[\"error\"],\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"message\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"},\"503\":{\"content\":{\"application/json\":{\"examples\":{\"cloudflare\":{\"summary\":\"Cloudflare protection active\",\"value\":{\"code\":\"CLOUDFLARE_VERIFICATION_REQUIRED\",\"message\":\"Cloudflare verification required. Please update session cookies\",\"status\":\"error\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Machine-readable error code\",\"example\":\"INVALID_URL\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"example\":\"Invalid TikTok URL provided\",\"type\":\"string\"},\"retry_after\":{\"description\":\"Seconds to wait before retrying (for rate limit errors)\",\"example\":300,\"type\":\"integer\"},\"status\":{\"description\":\"Error status indicator\",\"enum\":[\"error\"],\"example\":\"error\",\"type\":\"string\"}},\"required\":[\"status\",\"message\",\"code\"],\"type\":\"object\"}}},\"description\":\"Service unavailable - Cloudflare verification required\"}},\"security\":[{\"sessionId\":[]},{\"cloudflare\":[]}],\"securitySchemes\":{\"cloudflare\":{\"description\":\"Cloudflare clearance cookie required for bypassing Cloudflare protection. Can be found in browser cookies under the cookies tab on zefoy.com\",\"in\":\"cookie\",\"name\":\"cf_clearance\",\"type\":\"apiKey\"},\"sessionId\":{\"description\":\"Session ID cookie obtained from zefoy.com. Can be found in browser cookies under the cookies tab on zefoy.com\",\"in\":\"cookie\",\"name\":\"PHPSESSID\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/engagement", "segments": [{ "lit": "api" }, { "lit": "engagement" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "engagement", "name__orig": "engagement", "Name": "Engagement", "name_": "engagement", "name-": "engagement", "NAME": "ENGAGEMENT", "index$": 0 }, { "active": true, "entity": "engagement", "key$": "BasicEngagementFlow", "kind": "basic", "name": "BasicEngagementFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "engagement_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Engagement');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const engagement_ref01_ent = client.Engagement();
        let engagement_ref01_data = setup.data.new.engagement['engagement_ref01'];
        engagement_ref01_data = (await engagement_ref01_ent.create(engagement_ref01_data)).data();
        (0, node_assert_1.default)(null != engagement_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/engagement/EngagementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TiktokEngagementBotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['engagement01', 'engagement02', 'engagement03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID': idmap,
        'TIKTOK_ENGAGEMENT_BOT_TEST_LIVE': 'FALSE',
        'TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN': 'FALSE',
        'TIKTOK_ENGAGEMENT_BOT_APIKEY': '',
    });
    idmap = env['TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID'];
    const live = 'TRUE' === env.TIKTOK_ENGAGEMENT_BOT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TiktokEngagementBotSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.TIKTOK_ENGAGEMENT_BOT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EngagementEntity.test.js.map