import { gpsCoord } from './types'

function degToRad(degrees: number) {
  const PI_DIVIDE_BY_180 = 0.0174532925199433
  return degrees * PI_DIVIDE_BY_180
}

export function distanceBetween(coord1: gpsCoord, coord2: gpsCoord) {
  if (Math.abs(coord1.lat) > 90 || Math.abs(coord2.lat) > 90) {
    throw new Error('Latitude out of range')
  }
  if (Math.abs(coord1.lon) > 180 || Math.abs(coord2.lon) > 180) {
    throw new Error('Longitude out of range')
  }

  // const radiusMin = 6357
  // const radiusMax = 6378
  const radiusAvg = 6371

  const deltaLatDiv2 = degToRad(coord2.lat - coord1.lat) / 2
  const deltaLonDiv2 = degToRad(coord2.lon - coord1.lon) / 2

  const lat1 = degToRad(coord1.lat)
  const lat2 = degToRad(coord2.lat)

  // a => square of half the chord length between the points
  // c => angular distance in radians
  const a =
    Math.sin(deltaLatDiv2) * Math.sin(deltaLatDiv2) +
    Math.sin(deltaLonDiv2) *
      Math.sin(deltaLonDiv2) *
      Math.cos(lat1) *
      Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return radiusAvg * c
}

// http://www.movable-type.co.uk/scripts/latlong.html
