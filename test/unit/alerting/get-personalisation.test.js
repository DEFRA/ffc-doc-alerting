jest.mock('../../../app/alerting/get-environment')
const { getEnvironment: mockGetEnvironment } = require('../../../app/alerting/get-environment')

jest.mock('../../../app/alerting/get-scheme')
const { getScheme: mockGetScheme } = require('../../../app/alerting/get-scheme')

const { TEST_NAME } = require('../../../app/constants/environment-names')
const { SFI } = require('../../../app/constants/schemes')
const { UNKNOWN } = require('../../../app/constants/unknown')
const schemeNames = require('../../../app/constants/scheme-names')

const { getPersonalisation } = require('../../../app/alerting/get-personalisation')

let event

describe('get personalisation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEnvironment.mockReturnValue(TEST_NAME)
    mockGetScheme.mockReturnValue(schemeNames[SFI])

    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should return message from event data', () => {
    const result = getPersonalisation(event)
    expect(result.message).toBe(event.data.message)
  })

  test('should get environment', () => {
    getPersonalisation(event)
    expect(mockGetEnvironment).toHaveBeenCalledTimes(1)
  })

  test('should return environment', () => {
    const result = getPersonalisation(event)
    expect(result.environment).toBe(TEST_NAME)
  })

  test('should return event id as eventId', () => {
    const result = getPersonalisation(event)
    expect(result.eventId).toBe(event.id)
  })

  test('should return source', () => {
    const result = getPersonalisation(event)
    expect(result.source).toBe(event.source)
  })

  test('should return event time as formatted timestamp', () => {
    const result = getPersonalisation(event)
    expect(result.timestamp).toBe('01/01/2021 00:00')
  })

  test('should return frn from event data if exists', () => {
    const result = getPersonalisation(event)
    expect(result.frn).toBe(event.data.frn)
  })

  test('should return unknown frn if frn does not exist in event data', () => {
    delete event.data.frn
    const result = getPersonalisation(event)
    expect(result.frn).toBe(UNKNOWN)
  })

  test('should return invoice number from event data if exists', () => {
    const result = getPersonalisation(event)
    expect(result.invoiceNumber).toBe(event.data.invoiceNumber)
  })

  test('should return unknown invoice number if invoice number does not exist in event data', () => {
    delete event.data.invoiceNumber
    const result = getPersonalisation(event)
    expect(result.invoiceNumber).toBe(UNKNOWN)
  })

  test('should return contract number from event data if exists', () => {
    const result = getPersonalisation(event)
    expect(result.contractNumber).toBe(event.data.contractNumber)
  })

  test('should return unknown contract number if contract number does not exist in event data', () => {
    delete event.data.contractNumber
    const result = getPersonalisation(event)
    expect(result.contractNumber).toBe(UNKNOWN)
  })

  test('should return payment request number from event data if exists', () => {
    const result = getPersonalisation(event)
    expect(result.paymentRequestNumber).toBe(event.data.paymentRequestNumber)
  })

  test('should return unknown payment request number if payment request number does not exist in event data', () => {
    delete event.data.paymentRequestNumber
    const result = getPersonalisation(event)
    expect(result.paymentRequestNumber).toBe(UNKNOWN)
  })

  test('should get scheme name', () => {
    getPersonalisation(event)
    expect(mockGetScheme).toHaveBeenCalledTimes(1)
  })

  test('should get scheme name from scheme id', () => {
    getPersonalisation(event)
    expect(mockGetScheme).toHaveBeenCalledWith(event.data.schemeId)
  })

  test('should return scheme name', () => {
    const result = getPersonalisation(event)
    expect(result.scheme).toBe(schemeNames[SFI])
  })

  test('should include compact JSON in data_json containing event data fields', () => {
    const result = getPersonalisation(event)
    expect(typeof result.data_json).toBe('string')
    expect(result.data_json).toContain(event.data.message)
  })

  test('should return pretty data without outer braces for ((data_pretty)) (stripOuter)', () => {
    const result = getPersonalisation(event)
    const trimmed = (result.data_pretty || '').trim()
    expect(trimmed).not.toMatch(/^[[{]/)
    expect(result.data_pretty).toContain(event.data.message)
  })

  test('should handle circular references by inserting [Circular] markers', () => {
    const circularEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    circularEvent.data.circular = {}
    circularEvent.data.circular.self = circularEvent.data.circular

    const result = getPersonalisation(circularEvent)
    expect(result.data_json).toContain('[Circular]')
  })

  test('should preview error stack and truncate when too many lines', () => {
    const stackLines = Array.from({ length: 10 }, (_, i) => `line${i + 1}`).join('\n')
    const stackEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    stackEvent.data.err = { stack: stackLines }

    const result = getPersonalisation(stackEvent)
    expect(result.data_pretty).toContain('... (truncated)')
    expect(result.data_pretty).toContain('line1')
  })

  test('should fall back to error text when JSON.stringify throws and log the error', () => {
    const badEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    badEvent.data.bad = {
      toJSON: () => { throw new Error('cannot stringify') }
    }

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = getPersonalisation(badEvent)
    expect(result.data_json).toContain('unable to stringify data')

    // Ensure error logging occurred and contains the expected message and an Error object
    expect(errorSpy).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledWith('safeStringify failed:', expect.any(Error))

    // Ensure we didn't accidentally log to console.log
    expect(logSpy).not.toHaveBeenCalled()

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })

  test('should truncate very long JSON outputs with "... (truncated)" suffix', () => {
    const longEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    longEvent.data.large = 'x'.repeat(11000)

    const result = getPersonalisation(longEvent)
    expect(result.data_json).toContain('... (truncated)')
  })
})
