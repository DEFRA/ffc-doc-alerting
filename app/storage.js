const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('./config').storageConfig
let blobServiceClient
let containersInitialised

if (config.useConnectionStr) {
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
} else {
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const container = blobServiceClient.getContainerClient(config.container)

const initialiseContainers = async () => {
  if (config.createContainers) {
    await container.createIfNotExists()
  }
  await initialiseFolders()
  containersInitialised = true
}

const initialiseFolders = async () => {
  const placeHolderText = 'Placeholder'
  const inboundClient = container.getBlockBlobClient(`${config.inboundFolder}/default.txt`)
  const archiveClient = container.getBlockBlobClient(`${config.archiveFolder}/default.txt`)
  const quarantineClient = container.getBlockBlobClient(`${config.quarantineFolder}/default.txt`)
  const returnClient = container.getBlockBlobClient(`${config.returnFolder}/default.txt`)
  await inboundClient.upload(placeHolderText, placeHolderText.length)
  await archiveClient.upload(placeHolderText, placeHolderText.length)
  await quarantineClient.upload(placeHolderText, placeHolderText.length)
  await returnClient.upload(placeHolderText, placeHolderText.length)
}

const getBlob = async (folder, filename) => {
  containersInitialised ?? await initialiseContainers()
  return container.getBlockBlobClient(`${folder}/${filename}`)
}

const getInboundBlobClient = async (filename) => {
  return getBlob(config.inboundFolder, filename)
}

module.exports = {
  getInboundBlobClient,
  blobServiceClient
}
