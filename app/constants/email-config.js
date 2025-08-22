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
  [events.PUBLISH_ERROR]: {
    default: `${alertConfig.devTeamEmails}`
  },
  [events.ZERO_VALUE_STATEMENT]: {
    default: `${alertConfig.devTeamEmails}`
  },
  [events.DATA_PROCESSING_ERROR]: {
    default: `${alertConfig.devTeamEmails}`
  },
  [events.DATA_PUBLISHING_ERROR]: {
    default: `${alertConfig.devTeamEmails}`
  }
}
