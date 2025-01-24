const { getReturnFileContent } = require('../../../app/alerting/get-return-file-content')

describe('getReturnFileContent', () => {
  test('should return CSV string with provided data', () => {
    const event = {
      data: {
        sbi: '123456',
        frn: '654321',
        agreementNumber: 'CASE123',
        contractNumber: 'CLAIM456',
        claimDate: '01/02/2003',
        value: 1000,
        batch: 'FCAP_5678_1234555.dat',
        errorCode: 'ERR001',
        message: 'Error message'
      }
    }

    const expectedCSV = 'XXXX\r\n1\r\n10\r\n123456,654321,CASE123,CLAIM456,01/02/2003,10,,,5678,F,"Error message"'
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })

  test('should return CSV string with empty strings for missing data', () => {
    const event = {
      data: {}
    }

    const expectedCSV = 'XXXX\r\n1\r\n\r\n,,,,,,,,,F,""'
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })

  test('should handle non-integer amount correctly', () => {
    const event = {
      data: {
        value: '1000.50'
      }
    }

    const expectedCSV = 'XXXX\r\n1\r\n1000.50\r\n,,,,,1000.50,,,,F,""'
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })

  test('should handle integer amount correctly', () => {
    const event = {
      data: {
        value: 1000
      }
    }

    const expectedCSV = 'XXXX\r\n1\r\n10\r\n,,,,,10,,,,F,""'
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })
})
