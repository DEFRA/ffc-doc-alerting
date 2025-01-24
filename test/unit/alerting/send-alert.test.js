jest.mock('notifications-node-client')
const { NotifyClient: MockNotifyClient } = require('notifications-node-client')

jest.mock('../../../app/config')
const { alertConfig: mockAlertConfig } = require('../../../app/config')

jest.mock('../../../app/alerting/get-personalisation')
const { getPersonalisation: mockGetPersonalisation } = require('../../../app/alerting/get-personalisation')

const { EMAIL } = require('../../mocks/values/email')
const event = require('../../mocks/event')

const { PAYMENT_REJECTED } = require('../../../app/constants/templates')

const { sendAlert } = require('../../../app/alerting/send-alert')

describe('send alert', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAlertConfig.sendAlerts = true
    mockGetPersonalisation.mockReturnValue({ test: 'value' })
  })

  test('should send alert via notify', async () => {
    await sendAlert(EMAIL, PAYMENT_REJECTED, event)
    expect(MockNotifyClient.prototype.sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should get personalisation from event', async () => {
    await sendAlert(EMAIL, PAYMENT_REJECTED, event)
    expect(mockGetPersonalisation).toHaveBeenCalledWith(event)
  })

  test('should send alert to recipient with template and personalisation', async () => {
    await sendAlert(EMAIL, PAYMENT_REJECTED, event)
    expect(MockNotifyClient.prototype.sendEmail).toHaveBeenCalledWith(
      PAYMENT_REJECTED,
      EMAIL,
      { personalisation: { test: 'value' } }
    )
  })

  test('should not send alert if sending disabled', async () => {
    mockAlertConfig.sendAlerts = false
    await sendAlert(EMAIL, PAYMENT_REJECTED, event)
    expect(MockNotifyClient.prototype.sendEmail).not.toHaveBeenCalled()
  })
})
