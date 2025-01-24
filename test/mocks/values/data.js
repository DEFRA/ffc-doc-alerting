const { CONTRACT_NUMBER } = require('./contract-number')
const { FRN } = require('./frn')
const { INVOICE_NUMBER } = require('./invoice-number')
const { MESSAGE } = require('./message')
const { PAYMENT_REQUEST_NUMBER } = require('./payment-request-number')
const { SCHEME_ID } = require('./scheme-id')
const { SFI } = require('../../../app/constants/source-systems')

module.exports = {
  DATA: {
    message: MESSAGE,
    frn: FRN,
    invoiceNumber: INVOICE_NUMBER,
    schemeId: SCHEME_ID,
    contractNumber: CONTRACT_NUMBER,
    paymentRequestNumber: PAYMENT_REQUEST_NUMBER,
    sourceSystem: SFI
  }
}
