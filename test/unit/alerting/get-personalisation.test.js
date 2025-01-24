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
})
