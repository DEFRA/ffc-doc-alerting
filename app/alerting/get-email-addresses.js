const emailConfig = require('../constants/email-config')

const getEmailAddresses = (eventType, sourceSystem) => {
  const emailAddresses = emailConfig[eventType]?.[sourceSystem] || emailConfig[eventType]?.default
  return emailAddresses
}

module.exports = {
  getEmailAddresses
}
