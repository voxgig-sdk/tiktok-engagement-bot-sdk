

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TiktokEngagementBotSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EngagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TIKTOK_ENGAGEMENT_BOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('TIKTOK_ENGAGEMENT_BOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TiktokEngagementBotSDK.test()
    const ent = testsdk.Engagement()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TiktokEngagementBotSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Engagement().create({"action":1,"url":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TIKTOK_ENGAGEMENT_BOT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'engagement.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action":{"a":true,"h":"Action","n":"action","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Type of engagement requested","t":"`$STRING`","key$":"action","index$":0},"estimated_completion":{"a":true,"h":"Estimated Completion","n":"estimated_completion","r":false,"sh":"Estimated time to complete the request","t":"`$STRING`","key$":"estimated_completion","index$":1},"quantity":{"a":true,"h":"Quantity","n":"quantity","r":false,"sh":"Number of engagements being processed","t":"`$INTEGER`","key$":"quantity","index$":2},"request_id":{"a":true,"h":"Request Id","n":"request_id","r":false,"sh":"Unique identifier for tracking the request","t":"`$STRING`","key$":"request_id","index$":3},"url":{"a":true,"fo":"uri","h":"Url","n":"url","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Target TikTok URL","t":"`$STRING`","key$":"url","index$":4}},"name":"engagement","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["action","quantity","url"],"co":{"id":"POST /api/engagement","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/engagement","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"engagement"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"engagement","name__orig":"engagement","Name":"Engagement","name_":"engagement","name-":"engagement","NAME":"ENGAGEMENT","index$":0}, {"active":true,"entity":"engagement","key$":"BasicEngagementFlow","kind":"basic","name":"BasicEngagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"engagement_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Engagement', {"POST /api/engagement":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["url","action"],"properties":{"url":{"type":"string","format":"uri","description":"TikTok profile URL or video URL to boost engagement","example":"https://www.tiktok.com/@username/video/1234567890","key$":"url"},"action":{"type":"string","enum":["likes","followers","shares","views"],"description":"Type of engagement to boost","example":"likes","key$":"action"},"quantity":{"type":"integer","minimum":1,"maximum":10000,"description":"Number of engagements to add (optional, defaults to maximum available)","example":100,"key$":"quantity"}},"x-ref":"#/components/schemas/EngagementRequest","index$":1},"examples":{"likes":{"summary":"Request likes","value":{"url":"https://www.tiktok.com/@username/video/1234567890","action":"likes","quantity":100}},"followers":{"summary":"Request followers","value":{"url":"https://www.tiktok.com/@username","action":"followers","quantity":50}},"views":{"summary":"Request views","value":{"url":"https://www.tiktok.com/@username/video/1234567890","action":"views","quantity":1000}},"shares":{"summary":"Request shares","value":{"url":"https://www.tiktok.com/@username/video/1234567890","action":"shares","quantity":25}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const engagement_ref01_ent = client.Engagement()
    let engagement_ref01_data = setup.data.new.engagement['engagement_ref01']

    engagement_ref01_data = (await engagement_ref01_ent.create(engagement_ref01_data)).data()
    assert(null != engagement_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/engagement/EngagementTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TiktokEngagementBotSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['engagement01','engagement02','engagement03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID': idmap,
    'TIKTOK_ENGAGEMENT_BOT_TEST_LIVE': 'FALSE',
    'TIKTOK_ENGAGEMENT_BOT_TEST_EXPLAIN': 'FALSE',
    'TIKTOK_ENGAGEMENT_BOT_APIKEY': '',
  })

  idmap = env['TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID']

  const live = 'TRUE' === env.TIKTOK_ENGAGEMENT_BOT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TIKTOK_ENGAGEMENT_BOT_TEST_ENGAGEMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TiktokEngagementBotSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
