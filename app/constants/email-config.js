const alertConfig = require('../config/alert')
const events = require('./events')

module.exports = {
  [events.ETL_PROCESS_ERROR]: `${alertConfig.dwhEmails}`
}
