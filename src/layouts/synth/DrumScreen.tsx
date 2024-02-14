import { View, Text, ScrollView } from 'react-native';
import OperatorComponent from '../../components/OperatorComponent';
import AppStyle from '../../ui/AppStyle';
import HorizontalSlider from '../../components/HorizontalSlider';
import { FC, useState } from 'react';
import { defaultSliderMinValue, defaultSliderStep, maxNoteValue } from '../../utils/AppConsts';
import { Drum, Operator, Synth } from '../../types/SynthTypes';

type DrumProps = {
  drum: Drum;
}

const DrumScreen: FC<DrumProps> = props =>  {
  const {drum} = props;

  const updateNote = (newNote: number) => {

  }

  return (
    <ScrollView style={AppStyle.instrumentContainer}>
      <HorizontalSlider label='Note' value={drum.note} minValue={defaultSliderMinValue} maxValue={maxNoteValue} step={defaultSliderStep} onChangeFunc={updateNote}></HorizontalSlider>
      <View style={AppStyle.operatorsContainer}>
      {drum.operators.map((operator: Operator, i: number) => {
        return (
          <View>
            <Text style={AppStyle.operatorLabel}>-OP {i + 1} </Text>
            <OperatorComponent operatorId={i} operator={operator}/>
          </View>
        );
      })}
      </View>
    </ScrollView>
  );
}

export default DrumScreen;