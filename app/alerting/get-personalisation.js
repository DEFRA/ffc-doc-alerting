const moment = require('moment')
const { getEnvironment } = require('./get-environment')
const { getScheme } = require('./get-scheme')
const { DATE } = require('../constants/date-format')
const { UNKNOWN } = require('../constants/unknown')

const getPersonalisation = (event) => {
  return {
    ...event.data,
    environment: getEnvironment(),
    eventId: event.id,
    source: event.source,
    timestamp: moment(event.time).format(DATE),
    frn: event.data?.frn ?? UNKNOWN,
    invoiceNumber: event.data?.invoiceNumber ?? UNKNOWN,
    contractNumber: event.data?.contractNumber ?? UNKNOWN,
    paymentRequestNumber: event.data?.paymentRequestNumber ?? UNKNOWN,
    scheme: getScheme(event.data?.schemeId)
  }
}

module.exports = {
  getPersonalisation
}
