import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "engagement",
    "accessor": "Engagement",
    "op": "create",
    "method": "POST",
    "path": "/api/engagement",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "cookie",
          "name": "PHPSESSID"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": "success",
      "message": "Engagement boost initiated",
      "data": {
        "action": "likes",
        "quantity": 100,
        "url": "https://www.tiktok.com/@username/video/1234567890",
        "estimated_completion": "2-5 minutes"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
