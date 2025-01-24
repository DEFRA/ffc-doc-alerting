jest.mock('../../../app/config')
const { alertConfig: mockAlertConfig } = require('../../../app/config')

const { LOCAL, SANDPIT, DEVELOPMENT, TEST, PRE_PRODUCTION, PRODUCTION } = require('../../../app/constants/environment-codes')
const { LOCAL_NAME, SANDPIT_NAME, DEVELOPMENT_NAME, TEST_NAME, PRE_PRODUCTION_NAME, PRODUCTION_NAME } = require('../../../app/constants/environment-names')
const { UNKNOWN } = require('../../../app/constants/unknown')

const { getEnvironment } = require('../../../app/alerting/get-environment')

describe('get environment', () => {
  test('should return local name for local environment', () => {
    mockAlertConfig.environment = LOCAL
    const result = getEnvironment()
    expect(result).toBe(LOCAL_NAME)
  })

  test('should return sandpit name for sandpit environment', () => {
    mockAlertConfig.environment = SANDPIT
    const result = getEnvironment()
    expect(result).toBe(SANDPIT_NAME)
  })

  test('should return development name for development environment', () => {
    mockAlertConfig.environment = DEVELOPMENT
    const result = getEnvironment()
    expect(result).toBe(DEVELOPMENT_NAME)
  })

  test('should return test name for test environment', () => {
    mockAlertConfig.environment = TEST
    const result = getEnvironment()
    expect(result).toBe(TEST_NAME)
  })

  test('should return pre-production name for pre-production environment', () => {
    mockAlertConfig.environment = PRE_PRODUCTION
    const result = getEnvironment()
    expect(result).toBe(PRE_PRODUCTION_NAME)
  })

  test('should return production name for production environment', () => {
    mockAlertConfig.environment = PRODUCTION
    const result = getEnvironment()
    expect(result).toBe(PRODUCTION_NAME)
  })

  test('should return unknown for unknown environment', () => {
    mockAlertConfig.environment = 'snd2'
    const result = getEnvironment()
    expect(result).toBe(UNKNOWN)
  })
})
