const { messageConfig } = require('../config')
const { createServiceBusClient, createReceiver, subscribeReceiver, closeSenders } = require('./service-bus')
const { processAlertMessage } = require('./process-alert-message')

const errorHandler = (error) => {
  console.error('Error occurred:', error)
}

let sbClient
let receiver

const start = async () => {
  sbClient = createServiceBusClient(messageConfig.alertSubscription)
  receiver = createReceiver(sbClient, messageConfig.alertSubscription)
  subscribeReceiver(receiver, processAlertMessage, errorHandler, messageConfig.alertSubscription)

  console.info('Ready to process alerts')
}

const stop = async () => {
  await closeSenders()

  if (receiver) {
    try {
      await receiver.close()
    } catch (error) {
      console.error('Error occurred while closing receiver:', error)
    }
    receiver = null
  }

  if (sbClient) {
    try {
      await sbClient.close()
    } catch (error) {
      console.error('Error occurred while closing Service Bus client:', error)
    }
    sbClient = null
  }
}

module.exports = { start, stop }
