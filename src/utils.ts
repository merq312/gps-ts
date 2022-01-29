import { gpsCoord } from './types'

function degToRad(degrees: number) {
  const PI_DIVIDE_BY_180 = 0.0174532925199433
  return degrees * PI_DIVIDE_BY_180
}

export function distanceBetween(coord1: gpsCoord, coord2: gpsCoord) {
  // const radiusMin = 6357
  // const radiusMax = 6378

  if (Math.abs(coord1.lat) > 90 || Math.abs(coord2.lat) > 90) {
    throw new Error('Latitude out of range')
  }
  if (Math.abs(coord1.lon) > 180 || Math.abs(coord2.lon) > 180) {
    throw new Error('Longitude out of range')
  }

  const radiusAvg = 6371

  const deltaLat = degToRad(coord2.lat - coord1.lat)
  const deltaLon = degToRad(coord2.lon - coord1.lon)

  coord1.lat = degToRad(coord1.lat)
  coord2.lat = degToRad(coord2.lat)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2) *
      Math.cos(coord1.lat) *
      Math.cos(coord2.lat)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return radiusAvg * c
}
