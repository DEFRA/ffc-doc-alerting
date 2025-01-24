const Joi = require('joi')

const schema = Joi.object({
  notifyApiKey: Joi.string().required(),
  devTeamEmails: Joi.string().default(''),
  debtEnrichmentEmails: Joi.string().default(''),
  invalidBankDetailsEmails: Joi.string().default(''),
  coreSolutionsTeamEmails: Joi.string().default(''),
  sfiEmails: Joi.string().default(''),
  esEmails: Joi.string().default(''),
  fcEmails: Joi.string().default(''),
  traderEmails: Joi.string().default(''),
  vetVisitsEmails: Joi.string().default(''),
  opsAnalysisEmails: Joi.string().default(''),
  financeEmails: Joi.string().default(''),
  demographicsEmails: Joi.string().default(''),
  daxUnavailableEmails: Joi.string().default(''),
  esfioDAXEmails: Joi.string().default(''),
  d365UnsettledEmails: Joi.string().default(''),
  bpsEmails: Joi.string().default(''),
  csEmails: Joi.string().default(''),
  environment: Joi.string().default('local'),
  sendAlerts: Joi.boolean().default(true)
})

const config = {
  notifyApiKey: process.env.NOTIFY_API_KEY,
  devTeamEmails: process.env.DEV_TEAM_EMAILS,
  debtEnrichmentEmails: process.env.DEBT_ENRICHMENT_EMAILS,
  invalidBankDetailsEmails: process.env.INVALID_BANK_DETAILS_EMAILS,
  coreSolutionsTeamEmails: process.env.CORE_SOLUTIONS_TEAM_EMAILS,
  sfiEmails: process.env.SFI_EMAILS,
  esEmails: process.env.ES_EMAILS,
  fcEmails: process.env.FC_EMAILS,
  traderEmails: process.env.TRADER_EMAILS,
  vetVisitsEmails: process.env.VET_VISITS_EMAILS,
  opsAnalysisEmails: process.env.OPS_ANALYSIS_EMAILS,
  financeEmails: process.env.FINANCE_EMAILS,
  demographicsEmails: process.env.DEMOGAPHICS_EMAILS,
  daxUnavailableEmails: process.env.DAX_UNAVAILABLE_EMAILS,
  esfioDAXEmails: process.env.ESFIO_DAX_EMAILS,
  d365UnsettledEmails: process.env.D365_UNSETTLED_EMAILS,
  bpsEmails: process.env.BPS_EMAILS,
  csEmails: process.env.CS_EMAILS,
  environment: process.env.FFC_ENVIRONMENT,
  sendAlerts: process.env.SEND_ALERTS
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The alert config is invalid. ${result.error.message}`)
}

module.exports = result.value
