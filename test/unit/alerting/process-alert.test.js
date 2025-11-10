jest.mock('../../../app/alerting/send-alerts')
const { sendAlerts: mockSendAlerts } = require('../../../app/alerting/send-alerts')

const { RECIPIENTS } = require('../../mocks/values/recipients')
const {
  PROCESSING_SUBSCRIPTION_FAILED,
  SUBMIT_SUBSCRIPTION_FAILED,
  RETURN_SUBSCRIPTION_FAILED
} = require('../../../app/constants/events')
const {
  PROCESSING_SUBSCRIPTION_FAILED: PROCESSING_SUBSCRIPTION_FAILED_TEMPLATE,
  SUBMIT_SUBSCRIPTION_FAILED: SUBMIT_SUBSCRIPTION_FAILED_TEMPLATE,
  RETURN_SUBSCRIPTION_FAILED: RETURN_SUBSCRIPTION_FAILED_TEMPLATE
} = require('../../../app/constants/templates')
const { processAlert } = require('../../../app/alerting/process-alert')

let event

describe('processAlert', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test.each([
    [PROCESSING_SUBSCRIPTION_FAILED, PROCESSING_SUBSCRIPTION_FAILED_TEMPLATE],
    [SUBMIT_SUBSCRIPTION_FAILED, SUBMIT_SUBSCRIPTION_FAILED_TEMPLATE],
    [RETURN_SUBSCRIPTION_FAILED, RETURN_SUBSCRIPTION_FAILED_TEMPLATE]
  ])('should process %s event', async (eventType, template) => {
    event.type = eventType
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, template, event)
  })
})
