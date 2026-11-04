const alertConfig = require('../config/alert')
const events = require('./events')

module.exports = {
  [events.ETL_PROCESS_ERROR]: `${alertConfig.dwhEmails}`,
  [events.RETENTION_DATA_REJECTED]: `${alertConfig.dwhEmails}`,
  [events.RETENTION_FILE_REJECTED]: `${alertConfig.dwhEmails}`,
}
