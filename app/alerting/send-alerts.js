const { sendAlert } = require('./send-alert')

const sendAlerts = async (recipients, templateId, event) => {
  for (const recipient of recipients) {
    try {
      await sendAlert(recipient, templateId, event)
    } catch (err) {
      console.error(`Failed to send alert to ${recipient}`, err)
    }
  }
}

module.exports = {
  sendAlerts
}
