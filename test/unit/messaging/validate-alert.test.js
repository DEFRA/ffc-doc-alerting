const { VALIDATION } = require('../../../app/constants/errors')

jest.mock('../../../app/messaging/alert-schema')
const mockSchema = require('../../../app/messaging/alert-schema')

const event = require('../../mocks/event')

const { validateAlert } = require('../../../app/messaging/validate-alert')

describe('validate event', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockSchema.validate.mockReturnValue({ error: undefined })
  })

  test('should not throw an error if the event is valid', () => {
    expect(() => validateAlert(event)).not.toThrow()
  })

  test('should throw an error if the event is invalid', () => {
    mockSchema.validate.mockReturnValue({ error: new Error('Event is invalid') })
    expect(() => validateAlert(event)).toThrow()
  })

  test('should throw an error with validation category if the event is invalid', () => {
    mockSchema.validate.mockReturnValue({ error: new Error('Event is invalid') })
    try {
      validateAlert(event)
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
