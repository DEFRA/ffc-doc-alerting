const moment = require('moment')
const { getInboundBlobClient } = require('../storage')
const { getReturnFileContent } = require('./get-return-file-content')
const { UNKNOWN } = require('../constants/unknown')

const publishReturnFile = async (returnFilename, returnFileContent) => {
  const blobClient = await getInboundBlobClient(returnFilename)
  await blobClient.upload(returnFileContent, returnFileContent.length)
  console.info(`Published ${returnFilename}`)
}

const generateReturnFile = async (event) => {
  const currentDate = moment()
  // hard coded sequence because it will be correctly generated in pay responses service
  const sequenceString = 'XXXX'
  const frn = event.data?.frn ?? UNKNOWN
  const returnFilename = `FCAP_${sequenceString}_RPA_${currentDate.format('YYMMDDHHmmss')}_${frn}_NO_RETURN_MESSAGE.dat`
  const content = getReturnFileContent(event)
  return publishReturnFile(returnFilename, content)
}

module.exports = {
  generateReturnFile
}
