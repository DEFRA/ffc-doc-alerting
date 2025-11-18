jest.mock('../../../app/alerting/send-alert')
const { sendAlert: mockSendAlert } = require('../../../app/alerting/send-alert')

const { EMAIL } = require('../../mocks/values/email')
const event = require('../../mocks/event')

const { PAYMENT_REJECTED } = require('../../../app/constants/templates')

const { sendAlerts } = require('../../../app/alerting/send-alerts')

describe('sendAlerts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should send alert for each recipient', async () => {
    const recipients = [EMAIL, EMAIL]
    await sendAlerts(recipients, PAYMENT_REJECTED, event)
    expect(mockSendAlert).toHaveBeenCalledTimes(recipients.length)
  })

  test.each([EMAIL, 'other@example.com'])(
    'should send alert with recipient, template and event for %s',
    async (recipient) => {
      await sendAlerts([recipient], PAYMENT_REJECTED, event)
      expect(mockSendAlert).toHaveBeenCalledWith(recipient, PAYMENT_REJECTED, event)
    }
  )
})
