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

    expect(errorSpy).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledWith('safeStringify failed:', expect.any(Error))

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

  test('should format data as plain text without JSON syntax', () => {
    const result = getPersonalisation(event)
    expect(result.plain_text).toBeDefined()
    expect(result.plain_text).toContain(`*message: ${event.data.message}`)
    expect(result.plain_text).not.toContain('"')
    expect(result.plain_text).not.toContain('{')
    expect(result.plain_text).not.toContain('}')
  })

  test('should handle nested objects in plain text format', () => {
    event.data.nested = { key: 'value', num: 123 }
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*nested:')
    expect(result.plain_text).toContain('  *key: value')
    expect(result.plain_text).toContain('  *num: 123')
  })

  test('should format arrays in plain text with bullet points', () => {
    event.data.items = ['one', 'two']
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*items:')
    expect(result.plain_text).toContain('- one')
    expect(result.plain_text).toContain('- two')
  })

  test('should handle null and undefined values in plain text', () => {
    event.data.nullValue = null
    event.data.undefinedValue = undefined

    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*nullValue: null')
    expect(result.plain_text).toContain('*undefinedValue: null')
  })

  test('should handle Date objects in plain text format', () => {
    const testDate = new Date('2023-01-01T12:00:00Z')
    event.data.date = testDate

    const result = getPersonalisation(event)
    expect(result.plain_text).toContain(`*date: ${testDate.toString()}`)
  })

  test('should fall back to error message when formatAsPlainText throws', () => {
    // Mock console.error directly instead of using a spy
    const originalConsoleError = console.error
    console.error = jest.fn()

    try {
      // Create a truly problematic object with a getter that will throw
      // when formatAsPlainText tries to access it during object traversal
      const evilObject = {}
      Object.defineProperty(evilObject, 'evil', {
        enumerable: true,
        get: function () { throw new Error('Evil property access') }
      })
      event.data.evil = evilObject

      // This should trigger formatAsPlainText to throw
      const result = getPersonalisation(event)

      // Verify error logging behavior
      expect(console.error).toHaveBeenCalled()

      // Verify the content contains an error message
      expect(result.plain_text).toBeDefined()
      expect(result.plain_text).toContain('unable to stringify data')
    } finally {
      // Always restore console.error
      console.error = originalConsoleError
    }
  })
})

describe('formatAsPlainText edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEnvironment.mockReturnValue(TEST_NAME)
    mockGetScheme.mockReturnValue(schemeNames[SFI])

    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should return empty string for empty objects', () => {
    event.data = { emptyObj: {} }
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*emptyObj:')
    expect(result.plain_text).not.toContain('*emptyObj: {}')
  })

  test('should return empty string for empty arrays', () => {
    event.data = { emptyArr: [] }
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*emptyArr:')
    expect(result.plain_text).not.toContain('*emptyArr: []')
  })

  test('should handle circular references gracefully', () => {
    const circularEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    circularEvent.data.circular = {}
    circularEvent.data.circular.self = circularEvent.data.circular

    const result = getPersonalisation(circularEvent)
    // We expect it to either handle it or fall back to data_pretty
    expect(result.plain_text).toBeDefined()
  })
})

describe('getPersonalisation public-API edge cases for coverage', () => {
  test('empty object data -> data_pretty becomes empty string (stripOuter empty object)', () => {
    const emptyEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    emptyEvent.data = {}

    const result = getPersonalisation(emptyEvent)
    expect(result.data_json).toBe('{}')
    expect(result.data_pretty).toBe('')
  })

  test('empty array data -> data_pretty becomes empty string (stripOuter empty array)', () => {
    const emptyArrayEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    emptyArrayEvent.data = []

    const result = getPersonalisation(emptyArrayEvent)

    expect(result.data_json).toBe('[]')
    expect(result.data_pretty).toBe('')
  })

  test('stringify throws -> both compact and pretty fall back and error is logged', () => {
    const badEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    badEvent.data.bad = {
      toJSON: () => { throw new Error('cannot stringify') }
    }

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = getPersonalisation(badEvent)

    expect(result.data_json).toContain('unable to stringify data')

    const pretty = result.data_pretty || ''
    expect(pretty).toContain('unable to stringify data')
    expect(pretty.trim().startsWith('{')).toBe(true)
    expect(pretty.trim().startsWith('[')).toBe(false)

    expect(errorSpy).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledWith('safeStringify failed:', expect.any(Error))

    expect(logSpy).not.toHaveBeenCalled()

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
