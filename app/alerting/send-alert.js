const NotifyClient = require('notifications-node-client').NotifyClient
const { alertConfig } = require('../config')
const { getPersonalisation } = require('./get-personalisation')

const sendAlert = async (recipient, templateId, event) => {
  if (alertConfig.sendAlerts) {
    const notifyClient = new NotifyClient(alertConfig.notifyApiKey)
    await notifyClient.sendEmail(templateId, recipient, {
      personalisation: getPersonalisation(event)
    })
    console.log(`Sent alert to ${recipient}`)
  } else {
    console.log(`Sending alerts disabled, suppressing alert to ${recipient}`)
  }
}

module.exports = {
  sendAlert
}
