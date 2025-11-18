jest.mock('../../../app/alerting/get-email-addresses')
const { getEmailAddresses: mockGetEmailAddresses } = require('../../../app/alerting/get-email-addresses')

const { EMAIL } = require('../../mocks/values/email')
const event = require('../../mocks/event')

const { getRecipients } = require('../../../app/alerting/get-recipients')

describe('get recipients', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEmailAddresses.mockReturnValue(EMAIL)
  })

  test('should get email addresses', () => {
    getRecipients(event)
    expect(mockGetEmailAddresses).toHaveBeenCalledTimes(1)
  })

  test('should get email addresses from event type and source', () => {
    getRecipients(event)
    expect(mockGetEmailAddresses).toHaveBeenCalledWith(event.type)
  })

  test('should return email addresses as array', () => {
    const result = getRecipients(event)
    expect(result).toStrictEqual([EMAIL])
  })

  test('should return empty array if no email addresses', () => {
    mockGetEmailAddresses.mockImplementationOnce(() => undefined)
    const result = getRecipients(event)
    expect(result).toStrictEqual([])
  })

  test('should return array item for each email', () => {
    mockGetEmailAddresses.mockImplementationOnce(() => `${EMAIL};${EMAIL}`)
    const result = getRecipients(event)
    expect(result).toStrictEqual([EMAIL, EMAIL])
  })

  test('should remove whitespace from emails', () => {
    mockGetEmailAddresses.mockImplementationOnce(() => ` ${EMAIL} ; ${EMAIL} `)
    const result = getRecipients(event)
    expect(result).toStrictEqual([EMAIL, EMAIL])
  })

  test('should remove empty emails', () => {
    mockGetEmailAddresses.mockImplementationOnce(() => ` ${EMAIL} ;; ${EMAIL} `)
    const result = getRecipients(event)
    expect(result).toStrictEqual([EMAIL, EMAIL])
  })

  test('should handle newlines and mixed delimiters', () => {
    mockGetEmailAddresses.mockImplementationOnce(() => ` ${EMAIL}\n; ${EMAIL} ; \n`)
    const result = getRecipients(event)
    expect(result).toStrictEqual([EMAIL, EMAIL])
  })

  test('should always return an array', () => {
    const result = getRecipients(event)
    expect(Array.isArray(result)).toBe(true)
  })
})
