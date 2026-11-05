const alertConfig = require('../config/alert')

const getEmailAddresses = () => {
  return alertConfig.devTeamEmails
}

module.exports = {
  getEmailAddresses
}
