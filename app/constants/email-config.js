const alertConfig = require('../config/alert')
const events = require('./events')
const sourceSystems = require('./source-systems')

module.exports = {
  [events.PROCESSING_SUBSCRIPTION_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  },
  [events.SUBMIT_SUBSCRIPTION_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  },
  [events.RETURN_SUBSCRIPTION_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  },
  [events.ETL_PROCESS_ERROR]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  }
}
