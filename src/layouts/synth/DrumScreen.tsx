import { View, ScrollView } from 'react-native';
import AppStyle from '../../ui/AppStyle';
import HorizontalSlider from '../../components/HorizontalSlider';
import { defaultSliderMinValue, defaultSliderStep, maxNoteValue } from '../../utils/AppConsts';
import { useAppState } from '../../hooks/appContext';
import Channel from '../../components/Channel';
import Operators from '../../components/Operators';
import { NotePatch, OperatorPatch, OptionPatch } from '../../types/SynthTypes';
import SynthType from '../../components/SynthType';

const DrumScreen = ({ route }: any) =>  {
  const id = route.params.id as number;
  const {appState, dispatch} = useAppState();
  const drum = appState.activeProgram.drums[id];

  const updateNote = (updatedVal: object) => {
    dispatch({type: "updateNotes", payload: {instrumentId: id, updatedValue: updatedVal} as NotePatch});
  }

  const updateOperator = (operatorId: number, updatedVal: object) => {
    dispatch({type: "updateOperator", payload: {instrumentId: id, operatorId: operatorId, updatedValue: updatedVal} as OperatorPatch});
  }

  const updateOption = (updatedVal: object) => {
    dispatch({type: "updateOption", payload: {instrumentId: id, updatedValue: updatedVal} as OptionPatch});
  }

  return (
    <ScrollView style={AppStyle.screenContainer}>
      <HorizontalSlider label='Note' value={drum.note} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={(newNote: number) => updateNote({note: newNote})}></HorizontalSlider>
      <SynthType operators={2} defaultValue={drum.synthType} onSynthTypeChangeFunc={(newVal: number) => updateOption({synthType: newVal})}></SynthType>
      <Channel
      chFeedback={drum.feedback}
      left={drum.chLeft}
      right={drum.chRight}
      onChannelRChangeFunc={(newVal: boolean) => updateOption({chRight: newVal})}
      onChannelLChangeFunc={(newVal: boolean) => updateOption({chLeft: newVal})}
      onFeedbackChangeFunc={(newVal: number) => updateOption({feedback: newVal})}
      >
      </Channel>
      <View style={AppStyle.operatorsContainer}>
      <Operators lengthOps={2} operators={drum.operators} onOpChangeFunc={updateOperator}></Operators>
     </View>
    </ScrollView>
  );
}

export default DrumScreen;