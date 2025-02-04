const {
  PROCESSING_SUBSCRIPTION_FAILED,
  SUBMIT_SUBSCRIPTION_FAILED,
  RETURN_SUBSCRIPTION_FAILED
} = require('../../../app/constants/events')

const { alertConfig } = require('../../../app/config')

const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('get email addresses', () => {
  test('should return correct email addresses for PROCESSING_SUBSCRIPTION_FAILED', () => {
    const emails = getEmailAddresses(PROCESSING_SUBSCRIPTION_FAILED)
    expect(emails).toEqual(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return correct email addresses for SUBMIT_SUBSCRIPTION_FAILED', () => {
    const emails = getEmailAddresses(SUBMIT_SUBSCRIPTION_FAILED)
    expect(emails).toEqual(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return correct email addresses for RETURN_SUBSCRIPTION_FAILED', () => {
    const emails = getEmailAddresses(RETURN_SUBSCRIPTION_FAILED)
    expect(emails).toEqual(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
  })
})
