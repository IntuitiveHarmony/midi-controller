
import './App.css';
const { Midi } = require('@tonejs/midi')


const App = () => {
  console.clear()
  //------------------------------------------
  //    REQUEST MIDI ACCESS
  //------------------------------------------
  // navigator.requestMIDIAccess().then(access => {
  //   console.log(access)
  // }).catch(console.error)

  // navigator.requestMIDIAccess().then(access => {
  //   const devices = access.inputs.values()
  //   for (let device of devices)
  //     console.log(device)
  // }).catch(console.error)

  navigator.requestMIDIAccess().then(access => {
    const devices = access.inputs.values()
    for (let device of devices)
      device.onmidimessage = onMidiMessage
  }).catch(console.error)

  function onMidiMessage(message) {
    console.log(message)
  }






  return (
    <h1>hai</h1>
  )


}

export default App;
