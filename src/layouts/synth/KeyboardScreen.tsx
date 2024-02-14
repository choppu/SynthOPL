import { View, ScrollView } from 'react-native';
import Toggle from '../../components/Toggle';
import AppStyle from '../../ui/AppStyle';
import { useAppState } from '../../hooks/appContext';
import Channel from '../../components/Channel';
import Operators from '../../components/Operators';

const KeyboardScreen = () => {
  const {appState, dispatch} = useAppState();
  const updateVal = (...params: any) => {

  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <View style={{height: 40, flexDirection: 'row'}}>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepTremolo} label={"Deep Tremolo"} onChangeFunc={() => updateVal(!appState.activeProgram.keyboard.deepTremolo)}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.deepVibrato} label={"Deep Vibrato"} onChangeFunc={() => updateVal(!appState.activeProgram.keyboard.deepVibrato)}></Toggle>
      <Toggle layout={3} toggled={appState.activeProgram.keyboard.enable4Operators} label={"Enable 4 OPs"} onChangeFunc={() => updateVal(!appState.activeProgram.keyboard.enable4Operators)}></Toggle>
      </View>
      <Channel chFeedback={appState.activeProgram.keyboard.feedback} left={appState.activeProgram.keyboard.chLeft} right={appState.activeProgram.keyboard.chRight} cbFunc={updateVal}></Channel>
      <View style={AppStyle.operatorsContainer}>
        <Operators lengthOps={appState.activeProgram.keyboard.enable4Operators ? 4 : 2} lengthST={appState.activeProgram.keyboard.enable4Operators ? 2 : 1} operators={appState.activeProgram.keyboard.operators} synthTypesArr={appState.activeProgram.keyboard.synthType} cbFunc={updateVal}></Operators>
      </View>
    </ScrollView>
  );
}

export default KeyboardScreen;
