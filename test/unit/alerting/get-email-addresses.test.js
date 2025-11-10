const {
  PROCESSING_SUBSCRIPTION_FAILED,
  SUBMIT_SUBSCRIPTION_FAILED,
  RETURN_SUBSCRIPTION_FAILED,
  ETL_PROCESS_ERROR,
  PUBLISH_ERROR,
  ZERO_VALUE_STATEMENT,
  DUPLICATE_RECORD
} = require('../../../app/constants/events')

const { alertConfig } = require('../../../app/config')
const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('getEmailAddresses', () => {
  const devTeamEvents = [
    PROCESSING_SUBSCRIPTION_FAILED,
    SUBMIT_SUBSCRIPTION_FAILED,
    RETURN_SUBSCRIPTION_FAILED,
    PUBLISH_ERROR,
    ZERO_VALUE_STATEMENT,
    DUPLICATE_RECORD
  ]

  test.each(devTeamEvents)(
    'should return dev team emails for %s',
    (event) => {
      const emails = getEmailAddresses(event)
      expect(emails).toBe(alertConfig.devTeamEmails)
    }
  )

  test('should return dev and DWH emails for ETL_PROCESS_ERROR', () => {
    const emails = getEmailAddresses(ETL_PROCESS_ERROR)
    expect(emails).toBe(`${alertConfig.devTeamEmails};${alertConfig.dwhEmails}`)
  })
})
