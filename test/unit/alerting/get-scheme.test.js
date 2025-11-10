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

describe('getScheme', () => {
  test.each([
    [SFI, 'SFI'],
    [SFIP, 'SFI Pilot'],
    [LUMP_SUMS, 'Lump Sums'],
    [VET_VISITS, 'Vet Visits'],
    [CS, 'Countryside Stewardship'],
    [BPS, 'BPS'],
    [FDMR, 'FDMR'],
    [MANUAL, 'Manual Invoice'],
    [SFI23, 'SFI 23'],
    [DELINKED, 'Delinked Payments']
  ])('should return correct name for scheme %s', (schemeCode, expectedName) => {
    const result = getScheme(schemeCode)
    expect(result).toBe(expectedName)
  })

  test('should return "Unknown" for unknown scheme', () => {
    const result = getScheme('LNR')
    expect(result).toBe('Unknown')
  })
})
