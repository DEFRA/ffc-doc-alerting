const {
  PROCESSING_SUBSCRIPTION_FAILED,
  SUBMIT_SUBSCRIPTION_FAILED,
  RETURN_SUBSCRIPTION_FAILED,
  ETL_PROCESS_ERROR,
  PUBLISH_ERROR
} = require('../../../app/constants/events')

const { alertConfig } = require('../../../app/config')

const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('get email addresses', () => {
  test('should return correct email addresses for PROCESSING_SUBSCRIPTION_FAILED', () => {
    const emails = getEmailAddresses(PROCESSING_SUBSCRIPTION_FAILED)
    expect(emails).toEqual(`${alertConfig.devTeamEmails}`)
  })

  test('should return correct email addresses for SUBMIT_SUBSCRIPTION_FAILED', () => {
    const emails = getEmailAddresses(SUBMIT_SUBSCRIPTION_FAILED)
    expect(emails).toEqual(`${alertConfig.devTeamEmails}`)
  })

  test('should return correct email addresses for RETURN_SUBSCRIPTION_FAILED', () => {
    const emails = getEmailAddresses(RETURN_SUBSCRIPTION_FAILED)
    expect(emails).toEqual(`${alertConfig.devTeamEmails}`)
  })

  test('should return correct email addresses for ETL_PROCESS_ERROR', () => {
    const emails = getEmailAddresses(ETL_PROCESS_ERROR)
    expect(emails).toEqual(`${alertConfig.devTeamEmails};${alertConfig.dwhEmails}`)
  })

  test('should return empty string for PUBLISH_ERROR', () => {
    const emails = getEmailAddresses(PUBLISH_ERROR)
    expect(emails).toEqual(`${alertConfig.devTeamEmails}`)
  })
})
