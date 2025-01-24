const schemeNames = require('../constants/scheme-names')
const { UNKNOWN } = require('../constants/unknown')

const getScheme = (schemeId) => {
  return schemeNames[schemeId] ?? UNKNOWN
}

module.exports = {
  getScheme
}
