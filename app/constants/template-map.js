const {
  PROCESSING_SUBCRIPTION_FAILED: PROCESSING_SUBCRIPTION_FAILED_EVENT,
  SUBMIT_SUBCRIPTION_FAILED: SUBMIT_SUBCRIPTION_FAILED_EVENT,
  RETURN_SUBCRIPTION_FAILED: RETURN_SUBCRIPTION_FAILED_EVENT
} = require('./events')

const {
  PROCESSING_SUBCRIPTION_FAILED: PROCESSING_SUBCRIPTION_FAILED_TEMPLATE,
  SUBMIT_SUBCRIPTION_FAILED: SUBMIT_SUBCRIPTION_FAILED_TEMPLATE,
  RETURN_SUBCRIPTION_FAILED: RETURN_SUBCRIPTION_FAILED_TEMPLATE
} = require('./templates')

module.exports = {
  [PROCESSING_SUBCRIPTION_FAILED_EVENT]: PROCESSING_SUBCRIPTION_FAILED_TEMPLATE,
  [SUBMIT_SUBCRIPTION_FAILED_EVENT]: SUBMIT_SUBCRIPTION_FAILED_TEMPLATE,
  [RETURN_SUBCRIPTION_FAILED_EVENT]: RETURN_SUBCRIPTION_FAILED_TEMPLATE
}
