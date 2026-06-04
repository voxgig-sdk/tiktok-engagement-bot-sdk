# TiktokEngagementBot SDK

Automates Zefoy's TikTok engagement actions (likes, followers, shares, views) via a scripted client

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About TikTok Engagement Bot

This SDK targets [Zefoy](https://zefoy.com), a third-party web service that issues TikTok engagement actions (likes, followers, shares, views) on submitted video URLs. The upstream automation logic comes from the open-source [`xtekky/zefoy`](https://github.com/xtekky/zefoy) project, which drives the Zefoy site programmatically rather than calling a documented public API.

Zefoy is not operated by TikTok and is not an official TikTok product. The freepublicapis.com listing for this entry does not enumerate REST endpoints; in practice the integration models Zefoy's engagement actions as a single `engagement` resource.

Operational notes:

- Zefoy gates requests behind Cloudflare and CAPTCHA challenges, so automated runs typically require a real browser session or a solver and may break without notice.
- There is no stable, documented public API; behaviour can change whenever the underlying site changes.
- Using automated engagement against TikTok content can violate TikTok's terms of service and may put the target account at risk.

## Try it

**TypeScript**
```bash
npm install tiktok-engagement-bot
```

**Python**
```bash
pip install tiktok-engagement-bot-sdk
```

**PHP**
```bash
composer require voxgig/tiktok-engagement-bot-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/tiktok-engagement-bot-sdk/go
```

**Ruby**
```bash
gem install tiktok-engagement-bot-sdk
```

**Lua**
```bash
luarocks install tiktok-engagement-bot-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TiktokEngagementBotSDK } from 'tiktok-engagement-bot'

const client = new TiktokEngagementBotSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o tiktok-engagement-bot-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "tiktok-engagement-bot": {
      "command": "/abs/path/to/tiktok-engagement-bot-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Engagement** | Represents an automated engagement action (like, follower, share, or view) submitted against a TikTok video URL through the Zefoy site; no documented REST path is published. | `/api/engagement` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from tiktokengagementbot_sdk import TiktokEngagementBotSDK

client = TiktokEngagementBotSDK({})

```

### PHP

```php
<?php
require_once 'tiktokengagementbot_sdk.php';

$client = new TiktokEngagementBotSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/tiktok-engagement-bot-sdk/go"

client := sdk.NewTiktokEngagementBotSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "TiktokEngagementBot_sdk"

client = TiktokEngagementBotSDK.new({})

```

### Lua

```lua
local sdk = require("tiktok-engagement-bot_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TiktokEngagementBotSDK.test()
const result = await client.Engagement().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TiktokEngagementBotSDK.test(None, None)
result, err = client.Engagement(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TiktokEngagementBotSDK::test(null, null);
[$result, $err] = $client->Engagement(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Engagement(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TiktokEngagementBotSDK.test(nil, nil)
result, err = client.Engagement(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Engagement(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the TikTok Engagement Bot

- Upstream: [https://zefoy.com](https://zefoy.com)
- API docs: [https://github.com/xtekky/zefoy](https://github.com/xtekky/zefoy)

- Upstream `xtekky/zefoy` project is published under the MIT license.
- Attribution to the original author is expected when redistributing or adapting the code.
- Using this client to manipulate engagement metrics is likely to conflict with TikTok's Terms of Service and possibly Zefoy's own usage rules; check both before deploying.
- This SDK is a thin wrapper around an unofficial third-party service and ships with no warranty.

---

Generated from the TikTok Engagement Bot OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
