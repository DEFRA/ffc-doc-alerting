const { getEmailAddresses } = require('./get-email-addresses')

const getRecipients = (event) => {
  const emailAddresses = getEmailAddresses(event.type)
  return emailAddresses ? emailAddresses.replaceAll(/\s/g, '').trim().split(';').filter(x => x.length) : []
}

module.exports = {
  getRecipients
}
