jest.mock('../../../app/alerting/send-alert')
const { sendAlert: mockSendAlert } = require('../../../app/alerting/send-alert')

const { EMAIL } = require('../../mocks/values/email')
const event = require('../../mocks/event')

const { PAYMENT_REJECTED } = require('../../../app/constants/templates')

const { sendAlerts } = require('../../../app/alerting/send-alerts')

describe('send alerts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should send alert for each recipient', async () => {
    await sendAlerts([EMAIL, EMAIL], PAYMENT_REJECTED, event)
    expect(mockSendAlert).toHaveBeenCalledTimes(2)
  })

  test('should send alert with recipient, template and event', async () => {
    await sendAlerts([EMAIL, EMAIL], PAYMENT_REJECTED, event)
    expect(mockSendAlert).toHaveBeenCalledWith(EMAIL, PAYMENT_REJECTED, event)
  })
})
