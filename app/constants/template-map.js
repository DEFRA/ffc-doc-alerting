const {
  BATCH_REJECTED: BATCH_REJECTED_EVENT,
  BATCH_QUARANTINED: BATCH_QUARANTINED_EVENT,
  PAYMENT_REJECTED: PAYMENT_REJECTED_EVENT,
  PAYMENT_DAX_REJECTED: PAYMENT_DAX_REJECTED_EVENT,
  PAYMENT_INVALID_BANK: PAYMENT_INVALID_BANK_EVENT,
  PAYMENT_PROCESSING_FAILED: PAYMENT_PROCESSING_FAILED_EVENT,
  PAYMENT_SETTLEMENT_UNSETTLED: PAYMENT_SETTLEMENT_UNSETTLED_EVENT,
  PAYMENT_SETTLEMENT_UNMATCHED: PAYMENT_SETTLEMENT_UNMATCHED_EVENT,
  RESPONSE_REJECTED: RESPONSE_REJECTED_EVENT,
  PAYMENT_REQUEST_BLOCKED: PAYMENT_REQUEST_BLOCKED_EVENT,
  PAYMENT_DAX_UNAVAILABLE: PAYMENT_DAX_UNAVAILABLE_EVENT,
  RECEIVER_CONNECTION_FAILED: RECEIVER_CONNECTION_FAILED_EVENT,
  DEMOGRAPHICS_PROCESSING_FAILED: DEMOGRAPHICS_PROCESSING_FAILED_EVENT,
  DEMOGRAPHICS_UPDATE_FAILED: DEMOGRAPHICS_UPDATE_FAILED_EVENT
} = require('./events')

const {
  BATCH_REJECTED: BATCH_REJECTED_TEMPLATE,
  BATCH_QUARANTINED: BATCH_QUARANTINED_TEMPLATE,
  PAYMENT_REJECTED: PAYMENT_REJECTED_TEMPLATE,
  PAYMENT_DAX_REJECTED: PAYMENT_DAX_REJECTED_TEMPLATE,
  PAYMENT_INVALID_BANK: PAYMENT_INVALID_BANK_TEMPLATE,
  PAYMENT_PROCESSING_FAILED: PAYMENT_PROCESSING_FAILED_TEMPLATE,
  PAYMENT_SETTLEMENT_UNSETTLED: PAYMENT_SETTLEMENT_UNSETTLED_TEMPLATE,
  PAYMENT_SETTLEMENT_UNMATCHED: PAYMENT_SETTLEMENT_UNMATCHED_TEMPLATE,
  RESPONSE_REJECTED: RESPONSE_REJECTED_TEMPLATE,
  PAYMENT_REQUEST_BLOCKED: PAYMENT_REQUEST_BLOCKED_TEMPLATE,
  PAYMENT_DAX_UNAVAILABLE: PAYMENT_DAX_UNAVAILABLE_TEMPLATE,
  RECEIVER_CONNECTION_FAILED: RECEIVER_CONNECTION_FAILED_TEMPLATE,
  DEMOGRAPHICS_PROCESSING_FAILED: DEMOGRAPHICS_PROCESSING_FAILED_TEMPLATE,
  DEMOGRAPHICS_UPDATE_FAILED: DEMOGRAPHICS_UPDATE_FAILED_TEMPLATE
} = require('./templates')

module.exports = {
  [BATCH_REJECTED_EVENT]: BATCH_REJECTED_TEMPLATE,
  [BATCH_QUARANTINED_EVENT]: BATCH_QUARANTINED_TEMPLATE,
  [PAYMENT_REJECTED_EVENT]: PAYMENT_REJECTED_TEMPLATE,
  [PAYMENT_DAX_REJECTED_EVENT]: PAYMENT_DAX_REJECTED_TEMPLATE,
  [PAYMENT_INVALID_BANK_EVENT]: PAYMENT_INVALID_BANK_TEMPLATE,
  [PAYMENT_PROCESSING_FAILED_EVENT]: PAYMENT_PROCESSING_FAILED_TEMPLATE,
  [PAYMENT_SETTLEMENT_UNSETTLED_EVENT]: PAYMENT_SETTLEMENT_UNSETTLED_TEMPLATE,
  [PAYMENT_SETTLEMENT_UNMATCHED_EVENT]: PAYMENT_SETTLEMENT_UNMATCHED_TEMPLATE,
  [RESPONSE_REJECTED_EVENT]: RESPONSE_REJECTED_TEMPLATE,
  [PAYMENT_REQUEST_BLOCKED_EVENT]: PAYMENT_REQUEST_BLOCKED_TEMPLATE,
  [PAYMENT_DAX_UNAVAILABLE_EVENT]: PAYMENT_DAX_UNAVAILABLE_TEMPLATE,
  [RECEIVER_CONNECTION_FAILED_EVENT]: RECEIVER_CONNECTION_FAILED_TEMPLATE,
  [DEMOGRAPHICS_PROCESSING_FAILED_EVENT]: DEMOGRAPHICS_PROCESSING_FAILED_TEMPLATE,
  [DEMOGRAPHICS_UPDATE_FAILED_EVENT]: DEMOGRAPHICS_UPDATE_FAILED_TEMPLATE
}
