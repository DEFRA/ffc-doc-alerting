const { VALIDATION } = require('../../../app/constants/errors')

jest.mock('../../../app/alerting')
const { processAlert: mockProcessAlert } = require('../../../app/alerting')

jest.mock('../../../app/messaging/validate-alert')
const { validateAlert: mockValidateAlert } = require('../../../app/messaging/validate-alert')

const message = require('../../mocks/event')

const { processAlertMessage } = require('../../../app/messaging/process-alert-message')

const receiver = {
  completeMessage: jest.fn(),
  deadLetterMessage: jest.fn()
}

describe('process event message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockValidateAlert.mockReset()
  })

  test('should validate message body', async () => {
    await processAlertMessage(message, receiver)
    expect(mockValidateAlert).toHaveBeenCalledWith(message.body)
  })

  test('should process event', async () => {
    await processAlertMessage(message, receiver)
    expect(mockProcessAlert).toHaveBeenCalledWith(message.body)
  })

  test('should complete message if validation and processing do not throw error', async () => {
    await processAlertMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('should dead letter message if validation throws error', async () => {
    mockValidateAlert.mockImplementation(() => {
      const err = new Error('Validation error')
      err.category = VALIDATION
      throw err
    })
    await processAlertMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
  })

  test('should not complete message if validation throws error', async () => {
    mockValidateAlert.mockImplementation(() => {
      const err = new Error('Validation error')
      err.category = VALIDATION
      throw err
    })
    await processAlertMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
  })

  test('should not dead letter message if processing throws error', async () => {
    mockProcessAlert.mockImplementation(() => {
      throw new Error('Processing error')
    })
    await processAlertMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
  })

  test('should not complete message if processing throws error', async () => {
    mockProcessAlert.mockImplementation(() => {
      throw new Error('Processing error')
    })
    await processAlertMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
  })
})
