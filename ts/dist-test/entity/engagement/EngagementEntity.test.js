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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Type of engagement requested", "t": "`$STRING`", "key$": "action", "index$": 0 }, "estimated_completion": { "a": true, "h": "Estimated Completion", "n": "estimated_completion", "r": false, "sh": "Estimated time to complete the request", "t": "`$STRING`", "key$": "estimated_completion", "index$": 1 }, "quantity": { "a": true, "h": "Quantity", "n": "quantity", "r": false, "sh": "Number of engagements being processed", "t": "`$INTEGER`", "key$": "quantity", "index$": 2 }, "request_id": { "a": true, "h": "Request Id", "n": "request_id", "r": false, "sh": "Unique identifier for tracking the request", "t": "`$STRING`", "key$": "request_id", "index$": 3 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Target TikTok URL", "t": "`$STRING`", "key$": "url", "index$": 4 } }, "name": "engagement", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/engagement", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/engagement", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "engagement" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "engagement", "name__orig": "engagement", "Name": "Engagement", "name_": "engagement", "name-": "engagement", "NAME": "ENGAGEMENT", "index$": 0 }, { "active": true, "entity": "engagement", "key$": "BasicEngagementFlow", "kind": "basic", "name": "BasicEngagementFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "engagement_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Engagement', { "POST /api/engagement": { "protocol": "http", "operationId": "boostEngagement", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["url", "action"], "properties": { "url": { "type": "string", "format": "uri", "description": "TikTok profile URL or video URL to boost engagement", "example": "https://www.tiktok.com/@username/video/1234567890", "key$": "url" }, "action": { "type": "string", "enum": ["likes", "followers", "shares", "views"], "description": "Type of engagement to boost", "example": "likes", "key$": "action" }, "quantity": { "type": "integer", "minimum": 1, "maximum": 10000, "description": "Number of engagements to add (optional, defaults to maximum available)", "example": 100, "key$": "quantity" } }, "x-ref": "#/components/schemas/EngagementRequest", "index$": 1 }, "examples": { "likes": { "summary": "Request likes", "value": { "url": "https://www.tiktok.com/@username/video/1234567890", "action": "likes", "quantity": 100 } }, "followers": { "summary": "Request followers", "value": { "url": "https://www.tiktok.com/@username", "action": "followers", "quantity": 50 } }, "views": { "summary": "Request views", "value": { "url": "https://www.tiktok.com/@username/video/1234567890", "action": "views", "quantity": 1000 } }, "shares": { "summary": "Request shares", "value": { "url": "https://www.tiktok.com/@username/video/1234567890", "action": "shares", "quantity": 25 } } } } } }, "responses": { "200": { "description": "Engagement request successfully processed", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "enum": ["success", "pending"], "description": "Status of the engagement request", "example": "success" }, "message": { "type": "string", "description": "Human-readable message about the request", "example": "Engagement boost initiated" }, "data": { "type": "object", "properties": { "action": { "type": "string", "enum": ["likes", "followers", "shares", "views"], "description": "Type of engagement requested", "example": "likes", "key$": "action" }, "quantity": { "type": "integer", "description": "Number of engagements being processed", "example": 100, "key$": "quantity" }, "url": { "type": "string", "format": "uri", "description": "Target TikTok URL", "example": "https://www.tiktok.com/@username/video/1234567890", "key$": "url" }, "estimated_completion": { "type": "string", "description": "Estimated time to complete the request", "example": "2-5 minutes", "key$": "estimated_completion" }, "request_id": { "type": "string", "description": "Unique identifier for tracking the request", "example": "req_abc123xyz", "key$": "request_id" } }, "index$": 0 } }, "x-ref": "#/components/schemas/EngagementResponse" }, "examples": { "success": { "summary": "Successful response", "value": { "status": "success", "message": "Engagement boost initiated", "data": { "action": "likes", "quantity": 100, "url": "https://www.tiktok.com/@username/video/1234567890", "estimated_completion": "2-5 minutes" } } } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "enum": ["error"], "description": "Error status indicator", "example": "error" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid TikTok URL provided" }, "code": { "type": "string", "description": "Machine-readable error code", "example": "INVALID_URL" }, "retry_after": { "type": "integer", "description": "Seconds to wait before retrying (for rate limit errors)", "example": 300 } }, "required": ["status", "message", "code"], "x-ref": "#/components/schemas/ErrorResponse" }, "examples": { "invalid_url": { "summary": "Invalid TikTok URL", "value": { "status": "error", "message": "Invalid TikTok URL provided", "code": "INVALID_URL" } }, "invalid_action": { "summary": "Invalid action type", "value": { "status": "error", "message": "Action must be one of: likes, followers, shares, views", "code": "INVALID_ACTION" } } } } } }, "401": { "description": "Unauthorized - Missing or invalid session ID", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "enum": ["error"], "description": "Error status indicator", "example": "error" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid TikTok URL provided" }, "code": { "type": "string", "description": "Machine-readable error code", "example": "INVALID_URL" }, "retry_after": { "type": "integer", "description": "Seconds to wait before retrying (for rate limit errors)", "example": 300 } }, "required": ["status", "message", "code"], "x-ref": "#/components/schemas/ErrorResponse" }, "examples": { "unauthorized": { "summary": "Missing authentication", "value": { "status": "error", "message": "Valid session ID is required", "code": "UNAUTHORIZED" } } } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "enum": ["error"], "description": "Error status indicator", "example": "error" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid TikTok URL provided" }, "code": { "type": "string", "description": "Machine-readable error code", "example": "INVALID_URL" }, "retry_after": { "type": "integer", "description": "Seconds to wait before retrying (for rate limit errors)", "example": 300 } }, "required": ["status", "message", "code"], "x-ref": "#/components/schemas/ErrorResponse" }, "examples": { "rate_limit": { "summary": "Too many requests", "value": { "status": "error", "message": "Rate limit exceeded. Please try again later", "code": "RATE_LIMIT_EXCEEDED", "retry_after": 300 } } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "enum": ["error"], "description": "Error status indicator", "example": "error" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid TikTok URL provided" }, "code": { "type": "string", "description": "Machine-readable error code", "example": "INVALID_URL" }, "retry_after": { "type": "integer", "description": "Seconds to wait before retrying (for rate limit errors)", "example": 300 } }, "required": ["status", "message", "code"], "x-ref": "#/components/schemas/ErrorResponse" }, "examples": { "server_error": { "summary": "Server error", "value": { "status": "error", "message": "An internal server error occurred", "code": "INTERNAL_ERROR" } } } } } }, "503": { "description": "Service unavailable - Cloudflare verification required", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "enum": ["error"], "description": "Error status indicator", "example": "error" }, "message": { "type": "string", "description": "Human-readable error message", "example": "Invalid TikTok URL provided" }, "code": { "type": "string", "description": "Machine-readable error code", "example": "INVALID_URL" }, "retry_after": { "type": "integer", "description": "Seconds to wait before retrying (for rate limit errors)", "example": 300 } }, "required": ["status", "message", "code"], "x-ref": "#/components/schemas/ErrorResponse" }, "examples": { "cloudflare": { "summary": "Cloudflare protection active", "value": { "status": "error", "message": "Cloudflare verification required. Please update session cookies", "code": "CLOUDFLARE_VERIFICATION_REQUIRED" } } } } } } }, "parameters": [], "security": [{ "sessionId": [] }, { "cloudflare": [] }], "securitySource": "operation", "securitySchemes": { "sessionId": { "type": "apiKey", "in": "cookie", "name": "PHPSESSID", "description": "Session ID cookie obtained from zefoy.com. Can be found in browser cookies under the cookies tab on zefoy.com" }, "cloudflare": { "type": "apiKey", "in": "cookie", "name": "cf_clearance", "description": "Cloudflare clearance cookie required for bypassing Cloudflare protection. Can be found in browser cookies under the cookies tab on zefoy.com" } } } });
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