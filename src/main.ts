import { MockGPS } from './mock-gps'
import { v4 as uuidv4 } from 'uuid'
import * as mqtt from 'mqtt'
import { distanceBetween } from './utils'
import * as blessed from 'blessed'

const gps = new MockGPS()
const uuid = uuidv4()
const lastKnownDistances: Record<string, string> = {}

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
      console.log(`Error: ${err || 'unknown error'}`)
    }
  })
})

client.on('message', function (topic: string, message: Buffer) {
  const [sender, lat, lon] = message.toString().split(',')
  if (sender !== uuid) {
    const distance = distanceBetween(
      { lat: parseFloat(lat), lon: parseFloat(lon) },
      gps.coord,
    )
    lastKnownDistances[sender.split('-')[0]] = `${distance.toFixed(3)} km`
    drawBox()
  }
})

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
})

// Create a box centered horizontally and vertically.
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  content: '# jca gps tui',
  tags: true,
  style: {
    fg: 'white',
    bg: 'black',
  },
})

function drawBox() {
  let content = '# jca gps tui\n'
  content += `self id: ${uuid}\n`
  content += `current location: ${gps.coord.lat}, ${gps.coord.lon}\n\n`

  for (const [key, value] of Object.entries(lastKnownDistances)) {
    content += `${key}: ${value}\n`
  }

  box.setContent(content)
  screen.render()
}

// Append box to the screen.
screen.append(box)

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function () {
  return process.exit(0)
})

box.focus()
screen.render()
