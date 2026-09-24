
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TiktokEngagementBotSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TiktokEngagementBotSDK.test()
    equal(testsdk instanceof TiktokEngagementBotSDK, true,
      'TiktokEngagementBotSDK.test() must return a client synchronously')
  })

})
