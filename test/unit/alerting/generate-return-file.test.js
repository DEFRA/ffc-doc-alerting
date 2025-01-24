const moment = require('moment')
const { getInboundBlobClient } = require('../../../app/storage')
const { getReturnFileContent } = require('../../../app/alerting/get-return-file-content')
const { generateReturnFile } = require('../../../app/alerting/generate-return-file')
const { UNKNOWN } = require('../../../app/constants/unknown')

jest.mock('moment')
jest.mock('../../../app/storage')
jest.mock('../../../app/alerting/get-return-file-content')

describe('generateReturnFile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.info = jest.fn()
  })

  test('should generate and publish return file with correct content', async () => {
    const mockEvent = {
      data: {
        frn: 'frnTest',
        sbi: 'sbiTest',
        agreementNumber: 'agreementNumberTest',
        contractNumber: 'claimNumberTest',
        claimDate: 'claimDateTest',
        value: 'amountTest',
        batch: 'FCAP_1234_567890123456.dat',
        errorCode: 'F',
        errorMessage: 'errorMessageTest'
      }
    }
    const expectedContent = 'sbiTest,frnTest,agreementNumberTest,claimNumberTest,claimDateTest,amountTest,,,1234,F,"errorMessageTest"'
    const mockBlobClient = {
      upload: jest.fn().mockResolvedValue()
    }
    const mockMoment = {
      format: jest.fn().mockReturnValue('240101010101')
    }

    moment.mockReturnValue(mockMoment)
    getInboundBlobClient.mockResolvedValue(mockBlobClient)
    getReturnFileContent.mockReturnValue(expectedContent)

    await generateReturnFile(mockEvent)

    expect(getInboundBlobClient).toHaveBeenCalledWith('FCAP_XXXX_RPA_240101010101_frnTest_NO_RETURN_MESSAGE.dat')
    expect(mockBlobClient.upload).toHaveBeenCalledWith(expectedContent, expectedContent.length)
    expect(console.info).toHaveBeenCalledWith('Published FCAP_XXXX_RPA_240101010101_frnTest_NO_RETURN_MESSAGE.dat')
  })

  test('should handle missing frn and use UNKNOWN constant', async () => {
    const mockEvent = {
      data: {
        sbi: 'sbiTest',
        agreementNumber: 'agreementNumberTest',
        contractNumber: 'claimNumberTest',
        claimDate: 'claimDateTest',
        value: 'amountTest',
        batch: 'FCAP_1234_567890123456.dat',
        errorCode: 'F',
        errorMessage: 'errorMessageTest'
      }
    }
    const expectedContent = 'sbiTest,frnTest,agreementNumberTest,claimNumberTest,claimDateTest,amountTest,,,1234,F,"errorMessageTest"'
    const mockBlobClient = {
      upload: jest.fn().mockResolvedValue()
    }
    const mockMoment = {
      format: jest.fn().mockReturnValue('240101010101')
    }

    moment.mockReturnValue(mockMoment)
    getInboundBlobClient.mockResolvedValue(mockBlobClient)
    getReturnFileContent.mockReturnValue(expectedContent)

    await generateReturnFile(mockEvent)

    expect(getInboundBlobClient).toHaveBeenCalledWith(`FCAP_XXXX_RPA_240101010101_${UNKNOWN}_NO_RETURN_MESSAGE.dat`)
    expect(mockBlobClient.upload).toHaveBeenCalledWith(expectedContent, expectedContent.length)
    expect(console.info).toHaveBeenCalledWith(`Published FCAP_XXXX_RPA_240101010101_${UNKNOWN}_NO_RETURN_MESSAGE.dat`)
  })
})
