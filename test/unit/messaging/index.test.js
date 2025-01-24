const config = require('../../../app/config/message')
const mockSubscribe = jest.fn()
const mockCloseConnection = jest.fn()
const MockReceiver = jest.fn().mockImplementation(() => {
  return {
    subscribe: mockSubscribe,
    closeConnection: mockCloseConnection
  }
})
jest.mock('ffc-messaging', () => {
  return {
    MessageReceiver: MockReceiver
  }
})

const messageService = require('../../../app/messaging')

describe('messaging', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creates receiver for alert topic', async () => {
    await messageService.start()
    expect(MockReceiver).toHaveBeenCalledWith(config.alertSubscription, expect.anything())
  })

  test('subscribes to topic', async () => {
    await messageService.start()
    expect(mockSubscribe).toHaveBeenCalledTimes(1)
  })

  test('closes connection when stopped', async () => {
    await messageService.stop()
    expect(mockCloseConnection).toHaveBeenCalledTimes(1)
  })
})
