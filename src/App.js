
import './App.css';
const { Midi } = require('@tonejs/midi')


const App = () => {
  console.clear()
  //------------------------------------------
  //    REQUEST MIDI ACCESS
  //------------------------------------------
  navigator.requestMIDIAccess().then(access => {
    console.log(access)
  }).catch(console.error)


  //------------------------------------------
  //    SHOW DEVICES
  //------------------------------------------
  navigator.requestMIDIAccess().then(access => {
    const devices = access.inputs.values()
    for (let device of devices)
      console.log(device)
  }).catch(console.error)


  //------------------------------------------
  //    SHOW MIDI MESSAGES
  //------------------------------------------
  // function onMidiMessage(message) {
  //   console.log(message)
  // }


  //---------------------------------------------
  //    GRAB DATA FROM UNIT8 ARRAY AND
  //    ASSIGN THEM TO VARRIABLES
  //---------------------------------------------
  // function onMidiMessage(message) {
  //   let [_, input, value] = message.data
  //   console.log({input, value})
  // }



  class MIDIAccess {
  constructor(args = {}) {
    this.onDeviceInput = args.onDeviceInput || console.log;
  }

  start() {
    return new Promise((resolve, reject) => {
      this._requestAccess().then(access => {
        this.initialize(access);
        resolve();
      }).catch(() => reject('Something went wrong.'));
    });
  }

  initialize(access) {
    const devices = access.inputs.values();
    for (let device of devices) this.initializeDevice(device);
  }

  initializeDevice(device) {
    device.onmidimessage = this.onMessage.bind(this);
  }

  onMessage(message) {
    let [_, input, value] = message.data;
    this.onDeviceInput({ input, value });
  }

  _requestAccess() {
    return new Promise((resolve, reject) => {
      if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess()
          .then(resolve)
          .catch(reject);
      else reject();
    });
  }
}

  const midi = new MIDIAccess({onDeviceInput})
  midi.start().then(() => {
    console.log('Started')
  }).catch(console.error)

  function onDeviceInput({input, value}) {
    console.log('onDeviceInput', input, value)
  }












  return (
    <h3>O hai, Hook up your MIDI device, refresh the page and look in your console</h3>
  )


}

export default App;
