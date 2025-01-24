const {
  SFI,
  SFIP,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL,
  SFI23,
  DELINKED
} = require('../../../app/constants/schemes')

const { getScheme } = require('../../../app/alerting/get-scheme')

describe('get scheme', () => {
  test('should return SFI name for SFI scheme', () => {
    const result = getScheme(SFI)
    expect(result).toBe('SFI')
  })

  test('should return SFI Pilot name for SFI Pilot scheme', () => {
    const result = getScheme(SFIP)
    expect(result).toBe('SFI Pilot')
  })

  test('should return Lump Sums name for Lump Sums scheme', () => {
    const result = getScheme(LUMP_SUMS)
    expect(result).toBe('Lump Sums')
  })

  test('should return Vet Visits name for Vet Visits scheme', () => {
    const result = getScheme(VET_VISITS)
    expect(result).toBe('Vet Visits')
  })

  test('should return Countryside Stewardship name for Countryside Stewardship scheme', () => {
    const result = getScheme(CS)
    expect(result).toBe('Countryside Stewardship')
  })

  test('should return BPS name for BPS scheme', () => {
    const result = getScheme(BPS)
    expect(result).toBe('BPS')
  })

  test('should return FDMR name for FDMR scheme', () => {
    const result = getScheme(FDMR)
    expect(result).toBe('FDMR')
  })

  test('should return Manual Invoice name for Manual Invoice scheme', () => {
    const result = getScheme(MANUAL)
    expect(result).toBe('Manual Invoice')
  })

  test('should return SFI 23 name for SFI23 scheme', () => {
    const result = getScheme(SFI23)
    expect(result).toBe('SFI 23')
  })

  test('should return Delinked Payments name for Delinked scheme', () => {
    const result = getScheme(DELINKED)
    expect(result).toBe('Delinked Payments')
  })

  test('should return unknown for unknown scheme', () => {
    const result = getScheme('LNR')
    expect(result).toBe('Unknown')
  })
})
