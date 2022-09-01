
import './App.css';
const { Midi } = require('@tonejs/midi')


const App = () => {
  console.clear()

  class MIDIAccess {
    constructor(args ={}) {
      this.devices = {}
      this.onDeviceInput = args.onDeviceInput || console.log
    }

    start() {
      return Promise((resolve, reject) => {
        this._requestAccess().then(access =>{
          this.initialize(access)
          resolve()
        }).catch(() => reject('Something Went Wrong'))
      })
    }

    initialize(access) {
      const devices = access.inputs.values()
      for (let device of devices) this.initializeDevice(device)
    }

    initialize(device) {
      // this.devices[devices.id] = device.name
      device.onmidimessage = this.onMessage.bind(this)
    }

    onMessage(message) {
      let [ _, input, value] = message.data
      this.onDeviceInput({input, value})
    }

    _requestAccess() {
      return new Promise((resolve, reject) => {
        if (navigator.requestMIDIAccess)
          navigator.requestMIDIAccess()
            .then(resolve)
            .catch(reject)
          else reject()
      })
    }
  }

  function onMidiMessage(message) {
    let [_, input, value] = message.data
    console.log({input, value})
  }
  

  return (
    <h1>hai</h1>
  )


}

export default App;
