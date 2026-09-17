require('./insights').setup()
require('log-timestamp')
const { start, stop } = require('./messaging')

const handleShutdown = async (signal) => {
  console.info(`Received ${signal}. Shutting down...`)
  await stop()
  process.exit(0)
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'))
process.on('SIGINT', () => handleShutdown('SIGINT'))

module.exports = (async () => {
  await start()
})()
