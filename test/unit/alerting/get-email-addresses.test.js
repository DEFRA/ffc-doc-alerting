const {
  BATCH_REJECTED,
  BATCH_QUARANTINED,
  PAYMENT_REJECTED,
  PAYMENT_DAX_REJECTED,
  PAYMENT_INVALID_BANK,
  PAYMENT_PROCESSING_FAILED,
  PAYMENT_SETTLEMENT_UNSETTLED,
  PAYMENT_SETTLEMENT_UNMATCHED,
  RESPONSE_REJECTED,
  PAYMENT_REQUEST_BLOCKED,
  PAYMENT_DAX_UNAVAILABLE,
  RECEIVER_CONNECTION_FAILED,
  DEMOGRAPHICS_PROCESSING_FAILED,
  DEMOGRAPHICS_UPDATE_FAILED
} = require('../../../app/constants/events')

const { SFI, SFIP, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, ES, FC, IMPS, SFI23, DELINKED, SFI_EXPANDED } = require('../../../app/constants/source-systems')

const { alertConfig } = require('../../../app/config')

const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('get email addresses', () => {
  test.each([
    SFI,
    SFIP,
    SFI23
  ])('should return sfi emails, core solutions, finance and dev emails for batch rejected warning if SFI', (sourceSystem) => {
    const result = getEmailAddresses(BATCH_REJECTED, sourceSystem)
    expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test.each([
    LUMP_SUMS,
    FDMR
  ])('should return core solutions, finance and dev emails for batch rejected warning if non-BPS and CS Siti agri scheme or FDMR', (sourceSystem) => {
    const result = getEmailAddresses(BATCH_REJECTED, sourceSystem)
    expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for batch rejected warning if DELINKED', () => {
    const result = getEmailAddresses(BATCH_REJECTED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return sfi, ops analysis and dev emails for batch rejected warning if SFI Expanded', () => {
    const result = getEmailAddresses(BATCH_REJECTED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ES, finance and dev emails for batch rejected warning if ES', () => {
    const result = getEmailAddresses(BATCH_REJECTED, ES)
    expect(result).toBe(`${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return FC, finance and dev emails for batch rejected warning if FC', () => {
    const result = getEmailAddresses(BATCH_REJECTED, FC)
    expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return Trader, finance and dev emails for batch rejected warning if IMPS', () => {
    const result = getEmailAddresses(BATCH_REJECTED, IMPS)
    expect(result).toBe(`${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for batch quarantined warning for delinked', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for batch quarantined warning for sfi expanded', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for batch quarantined warning if not Delinked or SFI expanded', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test.each([
    SFI,
    SFIP,
    LUMP_SUMS,
    FDMR,
    SFI23
  ])('should return core solutions, finance and dev emails for payment rejected warning if non-BPS and CS Siti agri scheme or FDMR', (sourceSystem) => {
    const result = getEmailAddresses(PAYMENT_REJECTED, sourceSystem)
    expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for payment rejected warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for payment rejected warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return vet visits, finance and dev emails for payment rejected warning if vet visits', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, VET_VISITS)
    expect(result).toBe(`${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ES, finance and dev emails for payment rejected warning if ES', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, ES)
    expect(result).toBe(`${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return FC, finance and dev emails for payment rejected warning if FC', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, FC)
    expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return Trader, finance and dev emails for payment rejected warning if IMPS', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, IMPS)
    expect(result).toBe(`${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for payment dax rejected warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis, esfio DAX, and dev emails for payment dax rejected warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for payment dax rejected warning', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return ops analysis and CS emails for payment dax rejected warning if CS', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK, CS)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.csEmails}`)
  })

  test('should return ops analysis and BPS bank details emails for payment dax rejected warning if BPS', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK, BPS)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.bpsEmails}`)
  })

  test('should return ops analysis and invalid bank details emails for payment dax rejected warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`)
  })

  test('should return ops analysis and esfio dax details emails for payment dax rejected warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails}`)
  })

  test('should return FC and invalid bank details emails for payment dax rejected warning if FC', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK, FC)
    expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.invalidBankDetailsEmails}`)
  })

  test('should return ops analysis and invalid bank details emails for payment invalid bank warning', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`)
  })

  test('should return ops analysis and dev emails for payment processing failed warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return sfi, ops analysis and dev emails for payment processing failed warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for payment processing failed warning', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return d365 unsettled emails for payment settlement unsettled warning', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNSETTLED, SFI)
    expect(result).toBe(`${alertConfig.d365UnsettledEmails}`)
  })

  test('should return ops analysis and dev emails for payment settlement umatched warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return sfi, ops analysis and dev emails for payment settlement umatched warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for payment settlement unmatched warning', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return ops analysis and dev emails for response rejected warning if delinked', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis and dev emails for response rejected warning if sfi expanded', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for response rejected warning', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return ops analysis and debt enrichment emails for payment request blocked warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.debtEnrichmentEmails}`)
  })

  test('should return ops analysis and sfi emails for payment request blocked warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.sfiEmails}`)
  })

  test('should return debt enrichment emails for payment request blocked warning', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED)
    expect(result).toBe(alertConfig.debtEnrichmentEmails)
  })

  test('should return demographics emails and dev emails for demographics processing failed warning', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_PROCESSING_FAILED)
    expect(result).toBe(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return demographics emails and dev emails for demographics updates failed warning', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_UPDATE_FAILED)
    expect(result).toBe(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ops analysis, dev and dax unavaialable emails for dax unavailable warning if delinked', () => {
    const result = getEmailAddresses(PAYMENT_DAX_UNAVAILABLE, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`)
  })

  test('should return ops analysis, dev and esfio dax emails for dax unavailable warning if sfi expanded', () => {
    const result = getEmailAddresses(PAYMENT_DAX_UNAVAILABLE, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`)
  })

  test('should return dev emails and dax unavailable emails for dax unavailable warning', () => {
    const result = getEmailAddresses(PAYMENT_DAX_UNAVAILABLE)
    expect(result).toBe(`${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`)
  })

  test('should return ops analysis, dev emails and esfio DAX for receiver connection failed warning if sfi expanded', () => {
    const result = getEmailAddresses(RECEIVER_CONNECTION_FAILED, SFI_EXPANDED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`)
  })

  test('should return ops analysis and dev emails for receiver connection failed warning if delinked', () => {
    const result = getEmailAddresses(RECEIVER_CONNECTION_FAILED, DELINKED)
    expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for receiver connection failed warning', () => {
    const result = getEmailAddresses(RECEIVER_CONNECTION_FAILED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return BPS emails for batch rejected event', () => {
    const result = getEmailAddresses(BATCH_REJECTED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for batch rejected event', () => {
    const result = getEmailAddresses(BATCH_REJECTED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for batch quarantined event', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for batch quarantined event', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for payment rejected event', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for payment rejected event', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for payment dax rejected event', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for payment dax rejected event', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for payment processing failed event', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for payment processing failed event', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for payment settlement unsettled event', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNSETTLED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails}`)
  })

  test('should return CS emails for payment settlement unsettled event', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNSETTLED, CS)
    expect(result).toBe(`${alertConfig.csEmails}`)
  })

  test('should return BPS emails for payment settlement unmatched event', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for payment settlement unmatched event', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for response rejected event', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for response rejected event', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for payment request blocked event', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails}`)
  })

  test('should return CS emails for payment request blocked event', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED, CS)
    expect(result).toBe(`${alertConfig.csEmails}`)
  })

  test('should return BPS emails for payment dax unavailable event', () => {
    const result = getEmailAddresses(PAYMENT_DAX_UNAVAILABLE, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for payment dax unavailable event', () => {
    const result = getEmailAddresses(PAYMENT_DAX_UNAVAILABLE, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for receiver connection failed event', () => {
    const result = getEmailAddresses(RECEIVER_CONNECTION_FAILED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for receiver connection failed event', () => {
    const result = getEmailAddresses(RECEIVER_CONNECTION_FAILED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for demographics processing failed event', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_PROCESSING_FAILED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for demographics processing failed event', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_PROCESSING_FAILED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return BPS emails for demographics update failed event', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_UPDATE_FAILED, BPS)
    expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return CS emails for demographics update failed event', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_UPDATE_FAILED, CS)
    expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
  })
})
