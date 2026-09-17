const { messageConfig } = require('../../../app/config')

jest.mock('../../../app/messaging/service-bus', () => ({
  createServiceBusClient: jest.fn(),
  createReceiver: jest.fn(),
  subscribeReceiver: jest.fn(),
  closeSenders: jest.fn().mockResolvedValue()
}))

const serviceBus = require('../../../app/messaging/service-bus')
const messageService = require('../../../app/messaging')

describe('messaging', () => {
  const mockSbClient = { close: jest.fn().mockResolvedValue() }
  const mockReceiver = { close: jest.fn().mockResolvedValue() }

  beforeEach(() => {
    jest.clearAllMocks()
    serviceBus.createServiceBusClient.mockReturnValue(mockSbClient)
    serviceBus.createReceiver.mockReturnValue(mockReceiver)
  })

  test('creates Service Bus client for alert subscription', async () => {
    await messageService.start()
    expect(serviceBus.createServiceBusClient).toHaveBeenCalledWith(messageConfig.alertSubscription)
  })

  test('creates receiver for alert topic', async () => {
    await messageService.start()
    expect(serviceBus.createReceiver).toHaveBeenCalledWith(mockSbClient, messageConfig.alertSubscription)
  })

  test('subscribes to alert topic', async () => {
    await messageService.start()
    expect(serviceBus.subscribeReceiver).toHaveBeenCalledWith(
      mockReceiver,
      expect.any(Function),
      expect.any(Function),
      messageConfig.alertSubscription
    )
  })

  test('closes senders, receiver and client when stopped', async () => {
    await messageService.start()
    await messageService.stop()
    expect(serviceBus.closeSenders).toHaveBeenCalledTimes(1)
    expect(mockReceiver.close).toHaveBeenCalledTimes(1)
    expect(mockSbClient.close).toHaveBeenCalledTimes(1)
  })

  test('does not throw if stop is called before start', async () => {
    await expect(messageService.stop()).resolves.toBeUndefined()
  })
})
