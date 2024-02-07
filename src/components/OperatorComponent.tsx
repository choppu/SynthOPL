import React, {FC, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

import ADSRComponent from './ADSRComponent';
import CheckBox from '@react-native-community/checkbox';

const mainColor = "#04303E";

type OperatorProps = {
  operatorId: number;
};

const OperatorComponent: FC<OperatorProps> = props => {
  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(0);
  const [sustain, setSustain] = useState(0);
  const [release, setRelease] = useState(0);

  const onAttackUpdate = (newValue: number) => setAttack(newValue);
  const onDecaykUpdate = (newValue: number) => setDecay(newValue);
  const onSustainUpdate = (newValue: number) => setSustain(newValue);
  const onReleaseUpdate = (newValue: number) => setRelease(newValue);

  const [tremolo, setTremolo] = useState(false);
  const [vibrato, setVibrato] = useState(false);
  const [sustainingVoice, setsustainingVoice] = useState(false);
  const [envelopeScale, setenvelopeScale] = useState(false);

  const {operatorId} = props;

  return (
    <View style={operatorStyle.container}>
      <ADSRComponent adsrType={'Attack'} adsrValue={attack} adsrValueUpdate={onAttackUpdate}></ADSRComponent>
      <ADSRComponent adsrType={'Decay'} adsrValue={decay} adsrValueUpdate={onDecaykUpdate}></ADSRComponent>
      <ADSRComponent adsrType={'Sustain'} adsrValue={sustain} adsrValueUpdate={onSustainUpdate}></ADSRComponent>
      <ADSRComponent adsrType={'Release'} adsrValue={release} adsrValueUpdate={onReleaseUpdate}></ADSRComponent>
      <View>
        <View style={operatorStyle.checkboxContainer}>
        <CheckBox tintColors={{ true: mainColor, false: mainColor }} style={operatorStyle.checkbox} disabled={false} value={tremolo} onValueChange={(newValue) => setTremolo(newValue)} />
        <Text style={operatorStyle.label}>Tremolo</Text>
        </View>
        <View style={operatorStyle.checkboxContainer}>
        <CheckBox tintColors={{ true: mainColor, false: mainColor }} style={operatorStyle.checkbox} disabled={false} value={vibrato} onValueChange={(newValue) => setVibrato(newValue)} />
        <Text style={operatorStyle.label}>Vibrato</Text>
        </View>
        <View style={operatorStyle.checkboxContainer}>
        <CheckBox tintColors={{ true: mainColor, false: mainColor }} style={operatorStyle.checkbox} disabled={false} value={sustainingVoice} onValueChange={(newValue) => setsustainingVoice(newValue)} />
        <Text style={operatorStyle.label}>Sustaining Voice</Text>
        </View>
        <View style={operatorStyle.checkboxContainer}>
        <CheckBox tintColors={{ true: mainColor, false: mainColor }} style={operatorStyle.checkbox} disabled={false} value={envelopeScale} onValueChange={(newValue) => setenvelopeScale(newValue)} />
        <Text style={operatorStyle.label}>Envelope Scale</Text>
        </View>
      </View>
    </View>
  );
};

const operatorStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: '4%'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    fontFamily: 'Inconsolata-Medium',
    fontSize: 10,
    color: mainColor,
    textTransform: 'uppercase'
  },
});

export default OperatorComponent;