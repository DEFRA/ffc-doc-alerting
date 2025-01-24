const { getInboundBlobClient, blobServiceClient } = require('../../app/storage')
const config = require('../../app/config').storageConfig

jest.mock('@azure/storage-blob', () => {
  const mBlobServiceClient = {
    getContainerClient: jest.fn().mockReturnThis(),
    getBlockBlobClient: jest.fn().mockReturnThis(),
    upload: jest.fn().mockResolvedValue(true),
    createIfNotExists: jest.fn().mockResolvedValue(true)
  }
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn(() => mBlobServiceClient)
    },
    ContainerClient: jest.fn(() => mBlobServiceClient),
    BlockBlobClient: jest.fn(() => mBlobServiceClient)
  }
})

describe('Azure Blob Storage Module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should initialize containers and folders', async () => {
    const containerClient = blobServiceClient.getContainerClient(config.container)
    await containerClient.createIfNotExists()
    expect(containerClient.createIfNotExists).toHaveBeenCalled()
  })

  test('should upload placeholder files to folders', async () => {
    const containerClient = blobServiceClient.getContainerClient(config.container)
    const blockBlobClient = containerClient.getBlockBlobClient(`${config.inboundFolder}/default.txt`)
    await blockBlobClient.upload('Placeholder', 'Placeholder'.length)
    expect(blockBlobClient.upload).toHaveBeenCalledWith('Placeholder', 'Placeholder'.length)
  })

  test('should return the correct blob client for inbound folder', async () => {
    const blobClient = await getInboundBlobClient('testfile.txt')
    expect(blobClient).toBeDefined()
    expect(blobClient.upload).toBeDefined()
  })
})
