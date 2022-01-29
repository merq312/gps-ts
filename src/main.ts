import { MockGPS } from './mock-gps'
import { v4 as uuidv4 } from 'uuid'
import * as mqtt from 'mqtt'
import { distanceBetween } from './utils'

const gps = new MockGPS()
const uuid = uuidv4()

// const client = mqtt.connect("mqtt://test.mosquitto.org");
const client = mqtt.connect('mqtt://127.0.0.1:8883')

client.on('connect', function () {
  client.subscribe('gps', function (err: unknown) {
    if (!err) {
      setInterval(() => {
        const { lat, lon } = gps.get()
        const message = [uuid, lat, lon].join(',')
        client.publish('gps', message)
      }, 1000)
    } else {
      console.log(`Error: ${err}`)
    }
  })
})

client.on('message', function (topic: string, message: Buffer) {
  const [sender, lat, lon] = message.toString().split(',')
  if (sender !== uuid) {
    let distance =
      Math.round(
        1000 *
          distanceBetween(
            parseFloat(lat),
            parseFloat(lon),
            gps.coord.lat,
            gps.coord.lon,
          ),
      ) / 1000
    console.log(`${sender}: ${distance}km`)
  }
  // client.end();
})
