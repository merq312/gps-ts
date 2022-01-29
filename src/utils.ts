function degToRad(degrees: number) {
  return (degrees * Math.PI) / 180
}

export function distanceBetween(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  // const radiusMin = 6357
  // const radiusMax = 6378

  if (Math.abs(lat1) > 90 || Math.abs(lat2) > 90) {
    throw new Error('Latitude out of range')
  }
  if (Math.abs(lon1) > 180 || Math.abs(lon2) > 180) {
    throw new Error('Longitude out of range')
  }

  const radiusAvg = 6371

  const deltaLat = degToRad(lat2 - lat1)
  const deltaLon = degToRad(lon2 - lon1)

  lat1 = degToRad(lat1)
  lat2 = degToRad(lat2)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return radiusAvg * c
}
