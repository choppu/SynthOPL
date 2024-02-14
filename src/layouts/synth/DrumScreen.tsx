import { View, ScrollView } from 'react-native';
import AppStyle from '../../ui/AppStyle';
import HorizontalSlider from '../../components/HorizontalSlider';
import { defaultSliderMinValue, defaultSliderStep, maxNoteValue } from '../../utils/AppConsts';
import { useAppState } from '../../hooks/appContext';
import Channel from '../../components/Channel';
import Operators from '../../components/Operators';

const DrumScreen = ({ route }: any) =>  {
  const id = route.params.id as number;
  const {appState, dispatch} = useAppState();
  const drum = appState.activeProgram.drums[id];

  const updateNote = (newNote: number) => {

  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <HorizontalSlider label='Note' value={drum.note} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={updateNote}></HorizontalSlider>
      <Channel chFeedback={drum.feedback} left={drum.chLeft} right={drum.chRight} cbFunc={updateNote}></Channel>
      <View style={AppStyle.operatorsContainer}>
      <Operators lengthOps={2} lengthST={1} operators={drum.operators} synthTypesArr={[drum.synthType]} cbFunc={updateNote}></Operators>
     </View>
    </ScrollView>
  );
}

export default DrumScreen;