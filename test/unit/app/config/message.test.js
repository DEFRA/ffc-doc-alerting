const path = require('path')

describe('message config Joi validation', () => {
  const ORIGINAL_ENV = process.env
  const PRODUCTION = 'production'
  const CONFIG_PATH = path.resolve(__dirname, '../../../../app/config/message.js')

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
  })

  test('should export merged alertSubscription object with all required fields', () => {
    jest.resetModules()
    process.env.MESSAGE_QUEUE_HOST = 'localhost'
    process.env.MESSAGE_QUEUE_USER = 'user'
    process.env.MESSAGE_QUEUE_PASSWORD = 'pass'
    process.env.AZURE_CLIENT_ID = 'client-id'
    process.env.ALERT_SUBSCRIPTION_ADDRESS = 'address'
    process.env.ALERT_TOPIC_ADDRESS = 'topic'
    process.env.NODE_ENV = 'development'

    const { alertSubscription } = require(CONFIG_PATH)
    expect(alertSubscription).toMatchObject({
      host: 'localhost',
      username: 'user',
      password: 'pass',
      useCredentialChain: false,
      appInsights: undefined,
      managedIdentityClientId: 'client-id',
      address: 'address',
      topic: 'topic',
      type: 'subscription'
    })
  })

  test('should set useCredentialChain and appInsights when NODE_ENV is production', () => {
    jest.resetModules()
    process.env.MESSAGE_QUEUE_HOST = 'localhost'
    process.env.MESSAGE_QUEUE_USER = 'user'
    process.env.MESSAGE_QUEUE_PASSWORD = 'pass'
    process.env.AZURE_CLIENT_ID = 'client-id'
    process.env.ALERT_SUBSCRIPTION_ADDRESS = 'address'
    process.env.ALERT_TOPIC_ADDRESS = 'topic'
    process.env.NODE_ENV = PRODUCTION

    jest.doMock('applicationinsights', () => ({ key: 'value' }), { virtual: true })
    const { alertSubscription } = require(CONFIG_PATH)

    expect(alertSubscription.useCredentialChain).toBe(true)
    expect(alertSubscription.appInsights).toBeDefined()
  })

  test('should allow managedIdentityClientId to be undefined', () => {
    jest.resetModules()
    process.env.MESSAGE_QUEUE_HOST = 'localhost'
    process.env.MESSAGE_QUEUE_USER = 'user'
    process.env.MESSAGE_QUEUE_PASSWORD = 'pass'
    delete process.env.AZURE_CLIENT_ID
    process.env.ALERT_SUBSCRIPTION_ADDRESS = 'address'
    process.env.ALERT_TOPIC_ADDRESS = 'topic'
    process.env.NODE_ENV = 'development'

    const { alertSubscription } = require(CONFIG_PATH)
    expect(alertSubscription.managedIdentityClientId).toBeUndefined()
  })
})
