const {
  PROCESSING_SUBSCRIPTION_FAILED: PROCESSING_SUBSCRIPTION_FAILED_EVENT,
  SUBMIT_SUBSCRIPTION_FAILED: SUBMIT_SUBSCRIPTION_FAILED_EVENT,
  RETURN_SUBSCRIPTION_FAILED: RETURN_SUBSCRIPTION_FAILED_EVENT
} = require('./events')

const {
  PROCESSING_SUBSCRIPTION_FAILED: PROCESSING_SUBSCRIPTION_FAILED_TEMPLATE,
  SUBMIT_SUBSCRIPTION_FAILED: SUBMIT_SUBSCRIPTION_FAILED_TEMPLATE,
  RETURN_SUBSCRIPTION_FAILED: RETURN_SUBSCRIPTION_FAILED_TEMPLATE
} = require('./templates')

module.exports = {
  [PROCESSING_SUBSCRIPTION_FAILED_EVENT]: PROCESSING_SUBSCRIPTION_FAILED_TEMPLATE,
  [SUBMIT_SUBSCRIPTION_FAILED_EVENT]: SUBMIT_SUBSCRIPTION_FAILED_TEMPLATE,
  [RETURN_SUBSCRIPTION_FAILED_EVENT]: RETURN_SUBSCRIPTION_FAILED_TEMPLATE
}
