# TiktokEngagementBot SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TiktokEngagementBot",
            "slug": "tiktok-engagement-bot",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://zefoy.com",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "engagement": {},
            },
        },
        "entity": {
      "engagement": {
        "fields": [
          {
            "name": "action",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Type of engagement requested",
            "type": "`$STRING`",
          },
          {
            "name": "estimated_completion",
            "short": "Estimated time to complete the request",
            "type": "`$STRING`",
          },
          {
            "name": "quantity",
            "short": "Number of engagements being processed",
            "type": "`$INTEGER`",
          },
          {
            "name": "request_id",
            "short": "Unique identifier for tracking the request",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Target TikTok URL",
            "type": "`$STRING`",
          },
        ],
        "name": "engagement",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/engagement",
                "parts": [
                  "api",
                  "engagement",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
