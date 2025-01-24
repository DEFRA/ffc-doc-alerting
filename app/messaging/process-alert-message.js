const util = require('util')
const { VALIDATION } = require('../constants/errors')
const { validateAlert } = require('./validate-alert')
const { processAlert } = require('../alerting')

const processAlertMessage = async (message, receiver) => {
  try {
    const alert = message.body
    console.log('Alert received:', util.inspect(alert, false, null, true))
    validateAlert(alert)
    await processAlert(alert)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process alert:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = {
  processAlertMessage
}
