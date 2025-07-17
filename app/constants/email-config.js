const alertConfig = require('../config/alert')
const events = require('./events')

module.exports = {
  [events.PROCESSING_SUBSCRIPTION_FAILED]: {
    default: `${alertConfig.devTeamEmails}`
  },
  [events.SUBMIT_SUBSCRIPTION_FAILED]: {
    default: `${alertConfig.devTeamEmails}`
  },
  [events.RETURN_SUBSCRIPTION_FAILED]: {
    default: `${alertConfig.devTeamEmails}`
  },
  [events.ETL_PROCESS_ERROR]: {
    default: `${alertConfig.devTeamEmails};${alertConfig.dwhEmails}`
  },
  [events.ZERO_VALUE_STATEMENT]: {
    default: `${alertConfig.devTeamEmails}`
  }
}
