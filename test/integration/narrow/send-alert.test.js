jest.mock('notifications-node-client')
const { NotifyClient: MockNotifyClient } = require('notifications-node-client')

const message = require('../../mocks/message')

const { processAlertMessage } = require('../../../app/messaging/process-alert-message')

const receiver = {
  completeMessage: jest.fn()
}

describe('send alert', () => {
  test('should send alert via notify', async () => {
    await processAlertMessage(message, receiver)
    expect(MockNotifyClient.prototype.sendEmail).toHaveBeenCalled()
  })

  test('should complete message', async () => {
    await processAlertMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })
})
