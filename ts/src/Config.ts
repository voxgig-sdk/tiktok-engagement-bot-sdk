
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TiktokEngagementBot',
        slug: "tiktok-engagement-bot",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://zefoy.com",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      engagement: {
      },

    }
  }


  entity = {
    "engagement": {
      "fields": [
        {
          "name": "action",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Type of engagement requested",
          "type": "`$STRING`"
        },
        {
          "name": "estimated_completion",
          "short": "Estimated time to complete the request",
          "type": "`$STRING`"
        },
        {
          "name": "quantity",
          "short": "Number of engagements being processed",
          "type": "`$INTEGER`"
        },
        {
          "name": "request_id",
          "short": "Unique identifier for tracking the request",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Target TikTok URL",
          "type": "`$STRING`"
        }
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
                "engagement"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

