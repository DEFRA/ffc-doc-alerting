const { ERROR_CODE } = require('../constants/return-file')

const getCSVString = (data) => {
  const csvString = `${data.sbi},${data.frn},${data.agreementNumber},${data.claimNumber},${data.claimDate},${data.amount},,,${data.inboundFileNumber},${data.errorCode},"${data.errorMessage}"`
  return csvString
}

const getInboundFileNumber = (batch) => {
  const regex = /(?<=^[A-Z]{4}_)\d{4}/
  const match = batch.match(regex)
  return match ? match[0] : ''
}

const getReturnFileContent = (event) => {
  const batch = event.data?.batch || ''
  const inboundFileNumber = getInboundFileNumber(batch)
  let amount = event.data?.value || ''
  if (typeof amount === 'number' && Number.isInteger(amount)) {
    amount = amount / 100
  }
  const content = getCSVString({
    sbi: event.data?.sbi ?? '',
    frn: event.data?.frn ?? '',
    agreementNumber: event.data?.agreementNumber ?? '',
    claimNumber: event.data?.contractNumber ?? '',
    claimDate: event.data?.claimDate ?? '',
    amount,
    inboundFileNumber,
    errorCode: ERROR_CODE,
    errorMessage: event.data?.message ?? ''
  })
  return ['XXXX', 1, amount, content].join('\r\n')
}

module.exports = {
  getReturnFileContent
}
