import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import ADSRComponent from './ADSRComponent';
import CheckBox from '@react-native-community/checkbox';

const mainColor = "#04303E";
const unchekedColor = "#89a9b1";

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

  const onOffParams = {
    "tremolo": false,
    "vibrato": false,
    "sustainingVoice": false,
    "envelopeScale": false
  };

  const [tvseParams, setTVSEParams] = useState(onOffParams);

  const {operatorId} = props;

  const updateOnChecked = (paramName: string) => {
    setTVSEParams((prevState: any) => {
      return { ...prevState, [paramName]: !prevState[paramName] };
    })
  }

  useEffect(() => {
    console.log('Thiis is tremolo: ' + tvseParams.tremolo);
    console.log('Thiis is vib: ' + tvseParams.vibrato);
    console.log('Thiis is sus: ' + tvseParams.sustainingVoice);
    console.log('Thiis is env: ' + tvseParams.envelopeScale);
  }, [tvseParams])

  return (
    <View style={operatorStyle.container}>
      <View style={{height: 50, flexDirection: 'row'}}>
        <View style={operatorStyle.checkboxContainer}>
        <TouchableOpacity style={tvseParams.tremolo ? operatorStyle.checked : operatorStyle.unchecked} activeOpacity={0.8} onPress={() => updateOnChecked("tremolo")}>
        <Text style={operatorStyle.label}>Tremolo</Text>
        <Text style={operatorStyle.label}>-AM-</Text>
        </TouchableOpacity>
        </View>
        <View style={operatorStyle.checkboxContainer}>
        <TouchableOpacity style={tvseParams.vibrato ? operatorStyle.checked : operatorStyle.unchecked} activeOpacity={0.8} onPress={() => updateOnChecked("vibrato")}>
        <Text style={operatorStyle.label}>Vibrato</Text>
        <Text style={operatorStyle.label}>-VIB-</Text>
        </TouchableOpacity>
        </View>
        <View style={operatorStyle.checkboxContainer}>
        <TouchableOpacity style={tvseParams.sustainingVoice ? operatorStyle.checked : operatorStyle.unchecked} activeOpacity={0.8} onPress={() => updateOnChecked("sustainingVoice")}>
        <Text style={operatorStyle.label}>Sustaining Voice</Text>
        <Text style={operatorStyle.label}>-EG-</Text>
        </TouchableOpacity>
        </View>
        <View style={operatorStyle.checkboxContainer}>
        <TouchableOpacity style={tvseParams.envelopeScale ? operatorStyle.checked : operatorStyle.unchecked} activeOpacity={0.8} onPress={() => updateOnChecked("envelopeScale")}>
        <Text style={operatorStyle.label}>Envelope Scale</Text>
        <Text style={operatorStyle.label}>-KSR-</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={{height: 300, flexDirection: 'row'}}>
      <ADSRComponent adsrType={'Attack'} adsrValue={attack} adsrValueUpdate={onAttackUpdate}></ADSRComponent>
      <ADSRComponent adsrType={'Decay'} adsrValue={decay} adsrValueUpdate={onDecaykUpdate}></ADSRComponent>
      <ADSRComponent adsrType={'Sustain'} adsrValue={sustain} adsrValueUpdate={onSustainUpdate}></ADSRComponent>
      <ADSRComponent adsrType={'Release'} adsrValue={release} adsrValueUpdate={onReleaseUpdate}></ADSRComponent>
      </View>
    </View>
  );
};

const operatorStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '25%',
    marginBottom: 5,
    borderRightColor: 'white',
  },
  checked: {
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center'
  },
  unchecked: {
    backgroundColor: unchekedColor,
    width: '100%',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 10,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
});

export default OperatorComponent;