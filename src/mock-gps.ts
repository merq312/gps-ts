export type gpsCoord = {
  lat: number
  lon: number
}

export class MockGPS {
  coord: gpsCoord
  deltaCoord: gpsCoord

  constructor() {
    this.coord = { lat: Math.random() / 100, lon: Math.random() / 100 }
    this.deltaCoord = {
      lat: (Math.random() - 0.5) / 1000,
      lon: (Math.random() - 0.5) / 1000,
    }
  }

  get() {
    this.coord.lat += this.deltaCoord.lat
    this.coord.lon += this.deltaCoord.lon
    return this.coord
  }
}
