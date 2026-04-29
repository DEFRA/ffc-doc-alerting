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

describe('getPersonalisation', () => {
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

  test('should get environment and return expected name', () => {
    const result = getPersonalisation(event)
    expect(mockGetEnvironment).toHaveBeenCalledTimes(1)
    expect(result.environment).toBe(TEST_NAME)
  })

  test('should return event metadata fields correctly', () => {
    const result = getPersonalisation(event)
    expect(result.eventId).toBe(event.id)
    expect(result.source).toBe(event.source)
    expect(result.timestamp).toBe('01/01/2021 00:00')
  })

  test.each([
    ['frn', 'frn'],
    ['invoiceNumber', 'invoiceNumber'],
    ['contractNumber', 'contractNumber'],
    ['paymentRequestNumber', 'paymentRequestNumber']
  ])('should return correct or UNKNOWN value for %s', (fieldName) => {
    let result = getPersonalisation(event)
    expect(result[fieldName]).toBe(event.data[fieldName])

    delete event.data[fieldName]
    result = getPersonalisation(event)
    expect(result[fieldName]).toBe(UNKNOWN)
  })

  test('should resolve scheme name via getScheme', () => {
    const result = getPersonalisation(event)
    expect(mockGetScheme).toHaveBeenCalledWith(event.data.schemeId)
    expect(result.scheme).toBe(schemeNames[SFI])
  })

  test('should include compact JSON and pretty formatted data', () => {
    const result = getPersonalisation(event)
    expect(typeof result.data_json).toBe('string')
    expect(result.data_json).toContain(event.data.message)
    expect(result.data_pretty).toContain(event.data.message)
  })

  test('should handle circular references by inserting [Circular]', () => {
    const circularEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    circularEvent.data.circular = {}
    circularEvent.data.circular.self = circularEvent.data.circular
    const result = getPersonalisation(circularEvent)
    expect(result.data_json).toContain('[Circular]')
    expect(result.data_pretty).toContain('[Circular]')
  })

  test('should truncate long error stacks with "... (truncated)"', () => {
    const stackLines = Array.from({ length: 10 }, (_, i) => `line${i + 1}`).join('\n')
    const stackEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    stackEvent.data.err = { stack: stackLines }

    const result = getPersonalisation(stackEvent)
    expect(result.data_pretty).toContain('... (truncated)')
    expect(result.data_pretty).toContain('line1')
  })

  test('should handle stringify errors and log appropriately', () => {
    const badEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    badEvent.data.bad = { toJSON: () => { throw new Error('cannot stringify') } }

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })

    const result = getPersonalisation(badEvent)
    expect(result.data_json).toContain('unable to stringify data')
    expect(errorSpy).toHaveBeenCalledWith('safeStringify failed:', expect.any(Error))
    expect(logSpy).not.toHaveBeenCalled()

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })

  test('should truncate very long JSON outputs', () => {
    const longEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    longEvent.data.large = 'x'.repeat(11000)
    const result = getPersonalisation(longEvent)
    expect(result.data_json).toContain('... (truncated)')
  })

  test('should format data as readable plain text', () => {
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain(`*message: ${event.data.message}`)
    expect(result.plain_text).not.toMatch(/["{}]/)
  })

  test('should handle nested objects, arrays, and nulls gracefully', () => {
    event.data.nested = { key: 'value', num: 123 }
    event.data.items = ['one', 'two']
    event.data.nullValue = null
    event.data.undefinedValue = undefined

    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*nested:')
    expect(result.plain_text).toContain('  *key: value')
    expect(result.plain_text).toContain('*items:')
    expect(result.plain_text).toContain('- one')
    expect(result.plain_text).toContain('*nullValue: null')
    expect(result.plain_text).toContain('*undefinedValue: null')
  })

  test('should handle Date objects in plain text format', () => {
    const testDate = new Date('2023-01-01T12:00:00Z')
    event.data.date = testDate
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain(`*date: ${testDate.toString()}`)
  })

  test('should handle errors in plain text formatting gracefully', () => {
    const originalConsoleError = console.error
    console.error = jest.fn()

    try {
      const evilObject = {}
      Object.defineProperty(evilObject, 'evil', {
        enumerable: true,
        get () { throw new Error('Evil property access') }
      })
      event.data.evil = evilObject
      const result = getPersonalisation(event)
      expect(console.error).toHaveBeenCalled()
      expect(result.plain_text).toContain('unable to stringify data')
    } finally {
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

  test('should handle empty objects and arrays', () => {
    event.data = { emptyObj: {}, emptyArr: [] }
    const result = getPersonalisation(event)
    expect(result.plain_text).toContain('*emptyObj:')
    expect(result.plain_text).toContain('*emptyArr:')
  })

  test('should handle circular references gracefully', () => {
    const circularEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    circularEvent.data.circular = {}
    circularEvent.data.circular.self = circularEvent.data.circular
    const result = getPersonalisation(circularEvent)
    expect(result.plain_text).toBeDefined()
  })
})

describe('getPersonalisation public API edge cases', () => {
  test.each([
    [{}, '{}'],
    [[], '[]']
  ])('should handle empty data (%s) gracefully', (data, expectedJson) => {
    const event = JSON.parse(JSON.stringify(require('../../mocks/event')))
    event.data = data
    const result = getPersonalisation(event)
    expect(result.data_json).toBe(expectedJson)
    expect(result.data_pretty).toBe('')
  })

  test('should log errors when both stringifiers fail', () => {
    const badEvent = JSON.parse(JSON.stringify(require('../../mocks/event')))
    badEvent.data.bad = { toJSON: () => { throw new Error('cannot stringify') } }

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })

    const result = getPersonalisation(badEvent)
    expect(result.data_json).toContain('unable to stringify data')
    expect(result.data_pretty).toContain('unable to stringify data')
    expect(errorSpy).toHaveBeenCalledWith('safeStringify failed:', expect.any(Error))
    expect(logSpy).not.toHaveBeenCalled()

    logSpy.mockRestore()
    errorSpy.mockRestore()
  })
})

describe('getPersonalisation specific fields', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEnvironment.mockReturnValue(TEST_NAME)
    mockGetScheme.mockReturnValue(schemeNames[SFI])
    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test.each([
    ['schemeName'],
    ['agreementNumber'],
    ['endDate'],
    ['filename']
  ])('should return correct or UNKNOWN value for %s', (fieldName) => {
    let result = getPersonalisation(event)
    expect(result[fieldName]).toBe(event.data[fieldName] ?? UNKNOWN)

    delete event.data[fieldName]
    result = getPersonalisation(event)
    expect(result[fieldName]).toBe(UNKNOWN)
  })
})
