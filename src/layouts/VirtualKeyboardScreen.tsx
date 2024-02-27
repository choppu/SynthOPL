import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppState } from '../hooks/appContext';

import Piano from '../components/Piano';
import Synth from '../utils/Synth';
import BLE from '../utils/BLE';
import { Device } from 'react-native-ble-plx';
import { GATT_OPL_CHR_UUID_MSG } from '../utils/AppConsts';
import MidiNumbers from '../utils/MidiNumbers';
import DrumKey from '../components/DrumKey';
import AppStyle from '../ui/AppStyle';



const VirtualKeyboardScreen = () => {
  const {appState, dispatch} = useAppState();

  const handleNotePlay = (note: number, noteOn: boolean, channel: number) => {
    let data = Synth.encodeNoteCMD(note, noteOn, channel);
    BLE.writeCharacteristic(appState.connectedDevice as Device, GATT_OPL_CHR_UUID_MSG, data);
  }

  return (
    <View style={AppStyle.screenContainer}>
      <View style={{flexDirection: 'row', height: 130, marginTop: 15}}>
        <DrumKey keyLabel={'Cymbal'} keyVal={43} keyBackground={'violet'} onKeyPressed={handleNotePlay} onKeyReleased={handleNotePlay}></DrumKey>
        <DrumKey keyLabel={'Hi-Hat'} keyVal={44} keyBackground={'orange'} onKeyPressed={handleNotePlay} onKeyReleased={handleNotePlay}></DrumKey>
        <DrumKey keyLabel={'Extra'} keyVal={45} keyBackground={'cyan'} onKeyPressed={handleNotePlay} onKeyReleased={handleNotePlay}></DrumKey>
      </View>
      <View style={{flexDirection: 'row', height: 130, marginTop: 15}}>
        <DrumKey keyLabel={'Kick'} keyVal={40} keyBackground={'red'} onKeyPressed={handleNotePlay} onKeyReleased={handleNotePlay}></DrumKey>
        <DrumKey keyLabel={'Snare'} keyVal={41} keyBackground={'blue'} onKeyPressed={handleNotePlay} onKeyReleased={handleNotePlay}></DrumKey>
        <DrumKey keyLabel={'Tom'} keyVal={42} keyBackground={'green'} onKeyPressed={handleNotePlay} onKeyReleased={handleNotePlay}></DrumKey>
      </View>
      <View style={{flexDirection: 'row', height: 140, marginTop: 20}}>
        <Piano noteRange={{first: 'c2', last: 'c4'}} onPlayNoteInput={(note: string) => handleNotePlay(MidiNumbers.fromNote(note), true, 0)} onStopNoteInput={(note: string) => handleNotePlay(MidiNumbers.fromNote(note), false, 0)} />
      </View>
      <View style={{flexDirection: 'row', height: 140, marginTop: 20}}>
        <Piano noteRange={{first: 'c4', last: 'c6'}} onPlayNoteInput={(note: string) => handleNotePlay(MidiNumbers.fromNote(note), true, 0)} onStopNoteInput={(note: string) => handleNotePlay(MidiNumbers.fromNote(note), false, 0)} />
      </View>
    </View>
  );
}

const virtualKBStyle = StyleSheet.create({

});

export default VirtualKeyboardScreen;