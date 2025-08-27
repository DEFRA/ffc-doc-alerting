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

function truncateIfNeeded (json) {
  if (json.length > MAX_PERSONALISATION_LENGTH) {
    return json.slice(0, MAX_PERSONALISATION_LENGTH) + '... (truncated)'
  }
  return json
}

function stripOuterContent (json) {
  const trimmed = json.trim()
  const isObject = trimmed.startsWith('{') && trimmed.endsWith('}')
  const isArray = trimmed.startsWith('[') && trimmed.endsWith(']')
  if (isObject || isArray) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner.length === 0) {
      return ''
    }
    return inner
  }
  return json
}

function getFallbackString (pretty) {
  if (pretty) {
    return '{\n  "error": "unable to stringify data"\n}'
  }
  return '{"error":"unable to stringify data"}'
}

const safeStringify = (obj, pretty = false, stripOuter = false) => {
  try {
    const json = JSON.stringify(obj, createReplacer(), pretty ? 2 : 0) || '{}'
    const truncated = truncateIfNeeded(json)
    return stripOuter ? stripOuterContent(truncated) : truncated
  } catch (err) {
    console.error('safeStringify failed:', err)
    return getFallbackString(pretty)
  }
}

function formatAsPlainText (obj, indent = '') {
  if (obj === null || obj === undefined) {
    return 'null'
  }

  if (typeof obj !== 'object' || obj instanceof Date) {
    return String(obj)
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return ''
    return obj.map(item => `${indent}- ${formatAsPlainText(item, indent + '  ')}`).join('\n')
  }

  const entries = Object.entries(obj)
  if (entries.length === 0) return ''

  return entries
    .map(([key, value]) => {
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
        return `${indent}${key}: \n${formatAsPlainText(value, indent + '  ')}`
      }
      return `${indent}${key}: ${formatAsPlainText(value, indent + '  ')}`
    })
    .join('\n')
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

  // ((plain_text)) key-value pairs without JSON syntax
  try {
    base.plain_text = formatAsPlainText(event.data)
  } catch (err) {
    console.error('formatAsPlainText failed: Output to JSON format', err)
    base.plain_text = base.data_pretty
  }

  return base
}

module.exports = {
  getPersonalisation
}
