import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppState } from '../hooks/appContext';

import Piano from '../components/Piano';
import Synth from '../utils/Synth';
import BLE from '../utils/BLE';
import { Device } from 'react-native-ble-plx';
import { GATT_OPL_CHR_UUID_MSG } from '../utils/AppConsts';
import MidiNumbers from '../utils/MidiNumbers';



const VirtualKeyboardScreen = () => {
  const [notesRange, setNotesRange] = useState({ first: 'c4', last: 'c5' });
  const {appState, dispatch} = useAppState();

  const handleNotePlay = (note: string, noteOn: boolean) => {
    let midiNote = MidiNumbers.fromNote(note);
    let data = Synth.encodeNoteCMD(midiNote, noteOn);
    BLE.writeCharacteristic(appState.connectedDevice as Device, GATT_OPL_CHR_UUID_MSG, data);
  }

  return (
    <View style={{}}>
      <Piano
      noteRange={notesRange}
      onPlayNoteInput={(note: string) => handleNotePlay(note, true)}
      onStopNoteInput={(note: string) => handleNotePlay(note, false)}
      />
    </View>
  );
}

const virtualKBStyle = StyleSheet.create({

});

export default VirtualKeyboardScreen;