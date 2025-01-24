const alertConfig = require('../config/alert')
const events = require('./events')
const sourceSystems = require('./source-systems')

module.exports = {
  [events.BATCH_REJECTED]: {
    [sourceSystems.SFI]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FDMR]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.ES]: `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.IMPS]: `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.BATCH_QUARANTINED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_REJECTED]: {
    [sourceSystems.SFI]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FDMR]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.VET_VISITS]: `${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.ES]: `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.IMPS]: `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_DAX_REJECTED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_INVALID_BANK]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails}`,
    [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.invalidBankDetailsEmails}`,
    [sourceSystems.CS]: `${alertConfig.opsAnalysisEmails};${alertConfig.csEmails}`,
    [sourceSystems.BPS]: `${alertConfig.opsAnalysisEmails};${alertConfig.bpsEmails}`,
    default: `${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`
  },
  [events.PAYMENT_PROCESSING_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_SETTLEMENT_UNSETTLED]: {
    [sourceSystems.CS]: `${alertConfig.csEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails}`,
    default: alertConfig.d365UnsettledEmails
  },
  [events.PAYMENT_SETTLEMENT_UNMATCHED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.RESPONSE_REJECTED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_REQUEST_BLOCKED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.debtEnrichmentEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.sfiEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails}`,
    default: alertConfig.debtEnrichmentEmails
  },
  [events.PAYMENT_DAX_UNAVAILABLE]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`
  },
  [events.RECEIVER_CONNECTION_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.DEMOGRAPHICS_PROCESSING_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  },
  [events.DEMOGRAPHICS_UPDATE_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  }
}
