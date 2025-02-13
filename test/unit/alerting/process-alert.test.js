jest.mock('../../../app/alerting/generate-return-file')
const { generateReturnFile: mockGenerateReturnFile } = require('../../../app/alerting/generate-return-file')

jest.mock('../../../app/alerting/send-alerts')
const { sendAlerts: mockSendAlerts } = require('../../../app/alerting/send-alerts')

const { RECIPIENTS } = require('../../mocks/values/recipients')
const {
  PROCESSING_SUBSCRIPTION_FAILED,
  SUBMIT_SUBSCRIPTION_FAILED,
  RETURN_SUBSCRIPTION_FAILED,
  ETL_PROCESS_ERROR
} = require('../../../app/constants/events')
const {
  PROCESSING_SUBSCRIPTION_FAILED: PROCESSING_SUBSCRIPTION_FAILED_TEMPLATE,
  SUBMIT_SUBSCRIPTION_FAILED: SUBMIT_SUBSCRIPTION_FAILED_TEMPLATE,
  RETURN_SUBSCRIPTION_FAILED: RETURN_SUBSCRIPTION_FAILED_TEMPLATE,
  ETL_PROCESS_ERROR: ETL_PROCESS_ERROR_TEMPLATE
} = require('../../../app/constants/templates')
const { processAlert } = require('../../../app/alerting/process-alert')

let event

describe('process alert', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockGenerateReturnFile.mockReturnValue(RECIPIENTS)

    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should process PROCESSING_SUBSCRIPTION_FAILED event', async () => {
    event.type = PROCESSING_SUBSCRIPTION_FAILED
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, PROCESSING_SUBSCRIPTION_FAILED_TEMPLATE, event)
  })

  test('should process SUBMIT_SUBSCRIPTION_FAILED event', async () => {
    event.type = SUBMIT_SUBSCRIPTION_FAILED
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, SUBMIT_SUBSCRIPTION_FAILED_TEMPLATE, event)
  })

  test('should process RETURN_SUBSCRIPTION_FAILED event', async () => {
    event.type = RETURN_SUBSCRIPTION_FAILED
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, RETURN_SUBSCRIPTION_FAILED_TEMPLATE, event)
  })

  test('should process ETL_PROCESS_ERROR event', async () => {
    event.type = ETL_PROCESS_ERROR
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, ETL_PROCESS_ERROR_TEMPLATE, event)
  })
})
