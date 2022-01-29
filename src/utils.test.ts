import { distanceBetween } from './utils'

describe('distance calculation', () => {
  it('throws for out of range latitude and/or longitude', () => {
    expect(() => distanceBetween(-91, 0, 0, 0)).toThrow('Latitude out of range')
    expect(() => distanceBetween(0, -200, 45, 90)).toThrow(
      'Longitude out of range',
    )
    expect(() => distanceBetween(70, 0, 100, 0)).toThrow(
      'Latitude out of range',
    )
    expect(() => distanceBetween(0, 20, 45, 300)).toThrow(
      'Longitude out of range',
    )
  })

  it('returns zero for the same coordinate pair', () => {
    const res = distanceBetween(42, 80, 42, 80)
    expect(res).toBe(0)
  })

  it('accurate for very short (<100m) distances (+-10m)', () => {
    const lat1 = 46.50242973131753
    const lon1 = -81.00582681659645
    const lat2 = 46.50241865394658
    const lon2 = -81.00517235762065
    const res = distanceBetween(lat1, lon1, lat2, lon2)
    const actual = 0.048
    expect(res).toBeGreaterThan(actual - 0.01)
    expect(res).toBeLessThan(actual + 0.01)
  })

  it('accurate for medium (~10km) distances (+-100m)', () => {
    const lat1 = 46.50206126774254
    const lon1 = -81.00593296469764
    const lat2 = 46.52025216179274
    const lon2 = -80.9399890685659
    const res = distanceBetween(lat1, lon1, lat2, lon2)
    const actual = 5.44
    expect(res).toBeGreaterThan(actual - 0.1)
    expect(res).toBeLessThan(actual + 0.1)
  })

  it('accurate for long (~100km) distances (+-1km)', () => {
    const lat1 = 46.50020381528717
    const lon1 = -80.9965127688377
    const lat2 = 43.64609063084991
    const lon2 = -79.38449120357627
    const res = distanceBetween(lat1, lon1, lat2, lon2)
    const actual = 341
    expect(res).toBeGreaterThan(actual - 1)
    expect(res).toBeLessThan(actual + 1)
  })

  it('generally accurate at maximum distances (+-20km)', () => {
    const res = distanceBetween(-90, -180, 90, 180)
    const actual = 20002
    expect(res).toBeGreaterThan(actual - 20)
    expect(res).toBeLessThan(actual + 20)
  })
})
