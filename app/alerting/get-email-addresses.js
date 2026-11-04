const alertConfig = require('../config/alert')
const emailConfig = require('../constants/email-config')

const getEmailAddresses = (eventType) => {
  const emailAddresses = emailConfig[eventType] ? `${alertConfig.devTeamEmails};${emailConfig[eventType]}` : alertConfig.devTeamEmails
  return emailAddresses
}

module.exports = {
  getEmailAddresses
}
