const moment = require('moment')
const { getEnvironment } = require('./get-environment')
const { getScheme } = require('./get-scheme')
const { DATE } = require('../constants/date-format')
const { UNKNOWN } = require('../constants/unknown')

const MAX_PERSONALISATION_LENGTH = 10000
const STACK_PREVIEW_LINES = 5

function getStackPreview (stack) {
  if (typeof stack !== 'string') {
    return stack
  }
  const lines = stack.split('\n').map(l => l.trim()).filter(Boolean)
  const preview = lines.slice(0, STACK_PREVIEW_LINES).join('\n')
  return lines.length > STACK_PREVIEW_LINES ? `${preview}\n... (truncated)` : preview
}

function createReplacer () {
  const seen = new WeakSet()
  return function replacer (key, value) {
    if (value && typeof value === 'object') {
      if (seen.has(value)) {
        return '[Circular]'
      }
      seen.add(value)
    }

    if (key === 'stack' && typeof value === 'string') {
      return getStackPreview(value)
    }

    return value
  }
}

const safeStringify = (obj, pretty = false, stripOuter = false) => {
  try {
    const replacer = createReplacer()
    let json = JSON.stringify(obj, replacer, pretty ? 2 : 0) || '{}'

    if (json.length > MAX_PERSONALISATION_LENGTH) {
      json = json.slice(0, MAX_PERSONALISATION_LENGTH) + '... (truncated)'
    }

    if (stripOuter) {
      const trimmed = json.trim()
      const isObject = trimmed.startsWith('{') && trimmed.endsWith('}')
      const isArray = trimmed.startsWith('[') && trimmed.endsWith(']')
      if (isObject || isArray) {
        const inner = trimmed.slice(1, -1).trim()
        return inner.length === 0 ? '' : inner
      }
    }

    return json
  } catch (err) {
    console.error('safeStringify failed:', err)
    return pretty ? '{\n  "error": "unable to stringify data"\n}' : '{"error":"unable to stringify data"}'
  }
}

const getPersonalisation = (event) => {
  const base = {
    ...event.data,
    environment: getEnvironment(),
    eventId: event.id,
    source: event.source,
    timestamp: moment(event.time).format(DATE),
    frn: event.data?.frn ?? UNKNOWN,
    invoiceNumber: event.data?.invoiceNumber ?? UNKNOWN,
    contractNumber: event.data?.contractNumber ?? UNKNOWN,
    paymentRequestNumber: event.data?.paymentRequestNumber ?? UNKNOWN,
    scheme: getScheme(event.data?.schemeId)
  }

  // ((data_json)) compact single-line JSON
  base.data_json = safeStringify(event.data, false, false)

  // ((data_pretty)) pretty-printed multi-line JSON
  base.data_pretty = safeStringify(event.data, true, true)

  return base
}

module.exports = {
  getPersonalisation
}
