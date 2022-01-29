import { distanceBetween } from './utils'

describe('distance calculation', () => {
  it('throws for out of range latitude and/or longitude', () => {
    expect(() =>
      distanceBetween({ lat: -91, lon: 0 }, { lat: 0, lon: 0 }),
    ).toThrow('Latitude out of range')

    expect(() =>
      distanceBetween({ lat: 0, lon: -200 }, { lat: 45, lon: 90 }),
    ).toThrow('Longitude out of range')

    expect(() =>
      distanceBetween({ lat: 70, lon: 0 }, { lat: 100, lon: 0 }),
    ).toThrow('Latitude out of range')

    expect(() =>
      distanceBetween({ lat: 0, lon: 20 }, { lat: 45, lon: 300 }),
    ).toThrow('Longitude out of range')
  })

  it('returns zero for the same coordinate pair', () => {
    const res = distanceBetween({ lat: 42, lon: 80 }, { lat: 42, lon: 80 })
    expect(res).toBe(0)
  })

  it('accurate for very short (<100m) distances (+-10m)', () => {
    const coord1 = { lat: 46.50242973131753, lon: -81.00582681659645 }
    const coord2 = { lat: 46.50241865394658, lon: -81.00517235762065 }

    const res = distanceBetween(coord1, coord2)
    const actual = 0.048

    expect(res).toBeGreaterThan(actual - 0.01)
    expect(res).toBeLessThan(actual + 0.01)
  })

  it('accurate for medium (~10km) distances (+-100m)', () => {
    const coord1 = { lat: 46.50206126774254, lon: -81.00593296469764 }
    const coord2 = { lat: 46.52025216179274, lon: -80.9399890685659 }

    const res = distanceBetween(coord1, coord2)
    const actual = 5.44

    expect(res).toBeGreaterThan(actual - 0.1)
    expect(res).toBeLessThan(actual + 0.1)
  })

  it('accurate for long (~100km) distances (+-1km)', () => {
    const coord1 = { lat: 46.50020381528717, lon: -80.9965127688377 }
    const coord2 = { lat: 43.64609063084991, lon: -79.38449120357627 }

    const res = distanceBetween(coord1, coord2)
    const actual = 341

    expect(res).toBeGreaterThan(actual - 1)
    expect(res).toBeLessThan(actual + 1)
  })

  it('generally accurate at maximum distances (+-20km)', () => {
    const coord1 = { lat: -90, lon: -180 }
    const coord2 = { lat: 90, lon: 180 }

    const res = distanceBetween(coord1, coord2)
    const actual = 20002

    expect(res).toBeGreaterThan(actual - 20)
    expect(res).toBeLessThan(actual + 20)
  })
})
