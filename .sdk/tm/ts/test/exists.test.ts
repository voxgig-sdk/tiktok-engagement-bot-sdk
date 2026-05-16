
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TiktokEngagementBotSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TiktokEngagementBotSDK.test()
    equal(null !== testsdk, true)
  })

})
